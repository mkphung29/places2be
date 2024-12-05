import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Place from '../Place'; // Adjust the path as necessary

const db = getFirestore(); // Initialize Firestore

function PlaceScreen() {
  const router = useRouter();
  const { objectId } = useLocalSearchParams(); // Get the dynamic objectId from the route
  
  // State to store the place data
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPlaceData = async () => {
      if (!objectId) {
        console.error('No objectId provided');
        return;
      }

      try {
        // Reference to the document in the "places" collection
        const placeRef = doc(db, 'places', objectId);
        const placeSnap = await getDoc(placeRef);

        if (placeSnap.exists()) {
          setPlaceData(placeSnap.data()); // Set place data
        } else {
          console.error('Place not found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching place data:', error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchPlaceData(); // Call the function to fetch place data
  }, [objectId]); // Run the effect when objectId changes

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading place details...</Text>
      </View>
    );
  }

  if (!placeData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Place not found</Text>
      </View>
    );
  }

  return <Place {...placeData} objectId={objectId} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#B00020',
  },
});

export default PlaceScreen;
