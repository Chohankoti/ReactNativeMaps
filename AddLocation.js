import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import locationsData from './LocationData';

const AddLocation = () => {
  const [locationName, setLocationName] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleAddLocation = () => {
    if (locationName && location) {
      const newLocation = {
        name: locationName,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      };
      locationsData.push(newLocation);
      setLocationName('');
    } else {
      console.warn('Please enter a name.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Location Name"
        value={locationName}
        onChangeText={(text) => setLocationName(text)}
      />
      {location && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={location.coords.latitude.toString()}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={location.coords.longitude.toString()}
            editable={false}
          />
        </>
      )}
      <Button title="Add Location" onPress={handleAddLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default AddLocation;
