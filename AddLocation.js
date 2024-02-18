import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';


export default function AddLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    latitudeDelta: '',
    longitudeDelta: '',
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        }));
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Error fetching location');
      }
    })();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    setFormData({
      ...formData,
      name: '', 
    });

  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
        placeholder="Latitude"
        value={formData.latitude}
        editable={false}
      />
      <TextInput
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
        placeholder="Longitude"
        value={formData.longitude}
        editable={false}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});
