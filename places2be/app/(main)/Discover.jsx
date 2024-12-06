import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { router } from 'expo-router';
import Header from '../../components/Header.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import NavBar from '../../components/NavBar.jsx';

const Card = ({ placeName, photoUrls, objectId }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`(main)/Place/${objectId}`);
      }}
    >
      <View style={styles.card}>
        <Image source={{ uri: photoUrls[0] }} style={styles.image} />
        <Text style={styles.title}>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DiscoverScreen = () => {
  const [places, setPlaces] = useState([]); // State to store places
  const db = getFirestore(); // Firestore initialization
  const placesRef = collection(db, 'places'); // Reference to 'places' collection in Firestore

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(placesRef);
        const placesList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          objectId: doc.id, // Include document ID as objectId
        }));
        setPlaces(placesList); // Update state with fetched places
      } catch (error) {
        console.error('Error fetching places: ', error);
      }
    };

    fetchPlaces(); // Call the function to fetch the places
  }, []); // Empty dependency array to fetch data only once

  return (
    <View style={{ backgroundColor: '#D1C4E9', flex: 1, height: '100%', width: '100%' }}>
      <ColorBlock height={60} />
      <Header text={"Discover"} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
      {places.map(({ placeName, photoUrls, objectId }, index) => (
          <Card key={index} placeName={placeName} photoUrls={photoUrls} objectId={objectId} />
        ))}
        <ColorBlock height={100} />
      </ScrollView>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 5,
    borderColor: '#FFDAB9',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default DiscoverScreen;
