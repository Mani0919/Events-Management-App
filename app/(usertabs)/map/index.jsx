import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../../utlis/supabase';

const LocationMarkerMap = () => {
  const [region, setRegion] = useState(null);
  const [data, setData] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Needed', 'Location permissions are required to show events on the map');
        return;
      }
      getCity();
    } catch (error) {
      console.error("Permission error:", error);
    }
  }

  async function getCity() {
    try {
      const res = await AsyncStorage.getItem("city");
      if (res) {
        getEvents(res);
      }
    } catch (error) {
      console.error("Error getting city:", error);
    }
  }

  async function getEvents(city) {
    try {
      let { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("city", city);

      if (error) throw error;

      if (events && events.length > 0) {
        // Geocode all event locations
        const updatedEvents = await Promise.all(
          events.map(async (event) => {
            if (event.location) {
              try {
                const geoLocation = await Location.geocodeAsync(event.location);
                if (geoLocation.length > 0) {
                  return { ...event, latitude: geoLocation[0].latitude, longitude: geoLocation[0].longitude };
                }
              } catch (error) {
                console.error("Geocode error:", error);
              }
            }
            return { ...event, latitude: 17.3850, longitude: 78.4867 }; // Default fallback
          })
        );

        setData(updatedEvents);

        // Set initial region using the first event's coordinates
        if (updatedEvents.length > 0) {
          setRegion({
            latitude: updatedEvents[0].latitude,
            longitude: updatedEvents[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not fetch events');
    }
  }

  if (!region) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      initialRegion={region}
    >
      {data.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.latitude,
            longitude: event.longitude,
          }}
          title={event.eventname}
          description={`${event.location} | ${new Date(event.startdate).toLocaleDateString()}`}
        />
      ))}
    </MapView>
  );
};

export default LocationMarkerMap;
