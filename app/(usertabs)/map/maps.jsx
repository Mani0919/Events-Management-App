import React, { useState, useRef } from "react";
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyCuErAAK2QIvEG7XxqPUEtfisV2sw7EW00"; // Replace with your actual API key

export default function MapComponent() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 17.3850,
    longitude: 78.4867,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const animateToRegion = (newRegion) => {
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const searchLocation = async () => {
    if (!location.trim()) {
      Alert.alert("Error", "Please enter a location");
      return;
    }

    setIsLoading(true);
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await axios.get(url);
      
      if (response.data.status === "ZERO_RESULTS") {
        Alert.alert("Not Found", "Location not found. Please try a different search term.");
        return;
      }

      if (response.data.status === "REQUEST_DENIED") {
        Alert.alert("Error", "API key error. Please check your Google API key configuration.");
        return;
      }

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        const formattedAddress = response.data.results[0].formatted_address;
        
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setRegion(newRegion);
        setMarker({
          coordinate: {
            latitude: lat,
            longitude: lng,
          },
          title: formattedAddress,
        });
        
        // Animate to the new location
        animateToRegion(newRegion);
      } else {
        Alert.alert("Error", `Unexpected error: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error details:", error);
      Alert.alert(
        "Error",
        "Failed to fetch location. Please check your network connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search location..."
          value={location}
          onChangeText={setLocation}
          onSubmitEditing={searchLocation}
          returnKeyType="search"
          editable={!isLoading}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="small" color="#0000ff" />
        ) : (
          <Button
            title="Search"
            onPress={searchLocation}
            disabled={!location.trim() || isLoading}
          />
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {marker && (
          <Marker
            coordinate={marker.coordinate}
            title={marker.title}
            pinColor="#FF0000"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  map: {
    flex: 1,
    zIndex: 0,
  },
  loader: {
    marginRight: 10,
  },
});