import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);

  // Get initial location when component mounts
  useEffect(() => {
    const getInitialLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // If permission denied, use default location
          setRegion({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          // Get current location
          const location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } catch (error) {
        // If there's an error, use default location
        setRegion({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getInitialLocation();
  }, []);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=AIzaSyCuErAAK2QIvEG7XxqPUEtfisV2sw7EW00`
      );
      const data = await response.json();
      console.log("data",data)
      if (data.results && data.results.length > 0) {
       
        const { lat, lng } = data.results[0].geometry.location;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching location');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !region) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container} className="relative">
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        <Marker coordinate={region} />
      </MapView>
      {/* <View style={styles.searchContainer} className="absolute z-10 w-full bottom-0">
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchLocation}
          returnKeyType="search"
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: Dimensions.get('window').height - 100,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default MapSearch;