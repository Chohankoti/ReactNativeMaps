import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import locationsData from './LocationData';

export default function NavigateToLocation() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    setSearchQuery('');
    // Navigate to the NavigateToLocation screen with the selected location data
    navigation.navigate('NavigateToLocation', { location });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {currentLocation && selectedLocation && (
          <Polyline
            coordinates={[
              { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
              { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude },
            ]}
            strokeColor="#0000FF" // blue color
            strokeWidth={2}
          />
        )}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
          />
        )}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={selectedLocation.name}
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', top: 20, left: 20, right: 20 }}>
        <TextInput
          style={{ backgroundColor: '#fff', padding: 10 }}
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {/* Display search results */}
        {/* Assuming locationsData is available */}
        {locationsData
          .filter((location) =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((location) => (
            <TouchableOpacity
              key={location.name}
              onPress={() => handleLocationPress(location)}
            >
              <Text style={{ padding: 10 }}>{location.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}
