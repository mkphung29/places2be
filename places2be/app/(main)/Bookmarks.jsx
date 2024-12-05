import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/Header.jsx';
import Bookmark from '../../components/Bookmark.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import NavBar from '../../components/NavBar.jsx';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get the current user
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const Bookmarks = ({ places }) => {
  return (
    <View style={{ backgroundColor: '#D1C4E9', flex: 1, bottom: 92 }}>
      <ColorBlock height={152} />
      <Header text={"Bookmarks"} />
      <ScrollView>
        <ColorBlock height={10} />
        {places.map(({ placeName, photoUrls, address, objectId }, index) => (
          <Bookmark key={index} placeName={placeName} photoUrls={photoUrls} address={address} objectId={objectId} />
        ))}
        <ColorBlock height={10} />
      </ScrollView>
    </View>
  );
};

const BookmarksScreen = () => {
  const [placeData, setPlaceData] = useState([]); // State to hold the user's saved places
  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Firebase Auth
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    // Fetch the user's savedPlaces from Firestore
    const fetchSavedPlaces = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid); // Reference to the user's document
        const userDoc = await getDoc(userRef); // Get the user's document

        if (userDoc.exists()) {
          const savedPlaces = userDoc.data().savedPlaces || []; // Get savedPlaces or default to an empty array

          // Now, fetch the corresponding places from the places collection using objectId
          const placesData = [];
          for (let objectId of savedPlaces) {
            const placeRef = doc(db, 'places', objectId); // Reference to the place using objectId
            const placeDoc = await getDoc(placeRef); // Get the place document
            
            if (placeDoc.exists()) {
              placesData.push(placeDoc.data()); // Add the place data to the placesData array
            }
          }

          setPlaceData(placesData); // Update the state with the fetched places
        } else {
          console.log("No user document found");
        }
      }
    };

    fetchSavedPlaces(); // Call the function to fetch the saved places
  }, [user]); // Dependency array includes user to re-fetch when the user changes

  return (
    <View style={{ flex: 1 }}>
      <Bookmarks places={placeData} /> {/* Pass the fetched places to Bookmarks */}
      <NavBar />
    </View>
  );
};

export default BookmarksScreen;
