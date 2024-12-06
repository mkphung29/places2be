import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../app/(auth)/firebaseConfig'; // Ensure Firebase is initialized
import { doc, updateDoc, arrayUnion, arrayRemove, increment, setDoc, collection, getDoc } from "firebase/firestore";

const Header = ({ text, includeSave, objectId, includeBack, includeLogOut }) => {
  const navigation = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the place is already bookmarked
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser || !objectId) return;

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const savedPlaces = userDocSnap.data().savedPlaces || [];
          setIsBookmarked(savedPlaces.includes(objectId)); // Set bookmarked status based on saved places
        }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [objectId]);

  // Handle save/un-save button click
  const handleAddPhotoClick = async () => {
    navigation.push(`AddPhoto/${objectId}`);
  }

  const handleSaveClick = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Error", "You need to be logged in to save places.");
      return;
    }

    if (!objectId) {
      Alert.alert("Error", "No place selected to save.");
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      // If the place is already bookmarked, unbookmark it
      if (isBookmarked) {
        await updateDoc(userDocRef, {
          savedPlaces: arrayRemove(objectId), // Remove the objectId from the savedPlaces array
          numberSaves: increment(-1), // Decrement the number of saved places
        });

        // Update the shared 'places' collection
        const placeDocRef = doc(db, 'places', objectId);
        await setDoc(placeDocRef, {
          savedBy: arrayRemove(currentUser.uid), // Remove the user ID from the savedBy array
        }, { merge: true });
      } else {
        // If the place is not bookmarked, bookmark it
        await updateDoc(userDocRef, {
          savedPlaces: arrayUnion(objectId), // Add the objectId to the savedPlaces array
          numberSaves: increment(1), // Increment the number of saved places
        });
      }

      // Toggle the bookmarked state
      setIsBookmarked(!isBookmarked);

      Alert.alert("Success", isBookmarked ? "Place unbookmarked!" : "Place saved!");
    } catch (error) {
      console.error("Error saving or un-saving place:", error);
      Alert.alert("Error", "There was an issue with saving or un-saving the place. Please try again.");
    }
  };

  // Handle the Add button click based on the header text
  const handleAddClick = () => {
    if (text === 'Discover') {
      // Navigate to AddPlace.jsx if the header is "Discover"
      navigation.push('(main)/AddPlace');
    } else if (text === 'Comments') {
      // Navigate to AddComment.jsx if the header is "Comments"
      navigation.push(`AddComment/${objectId}`);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {includeBack && (
        <TouchableOpacity 
          style={styles.backButtonContainer}
          onPress={() => navigation.back()} // Navigates backward on press of button
        >
          <Image
            source={require('../../places2be/assets/images/backArrow.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      )}

<View style={styles.addPhotoButtonContainer}>
  {text === "Comments" && (
    <TouchableOpacity onPress={handleAddPhotoClick}>
      <Image
        source={require('../../places2be/assets/images/AddPhoto.png')}
        style={styles.addPhotoButton}
      />
    </TouchableOpacity>
  )}
</View>


      {/* Header Text */}
      <Text style={styles.headerText}>{text}</Text>

      {/* Right Button (Save or LogOut) */}
      <View style={styles.rightButtonContainer}>
        {text === 'Comments' || text === 'Discover' ? (
          <TouchableOpacity onPress={handleAddClick}>
            <Image
              source={require('../../places2be/assets/images/Add.png')}
              style={styles.rightButton}
            />
          </TouchableOpacity>
        ) : (
          <>
            {includeSave && (
              <TouchableOpacity onPress={handleSaveClick}>
                <Image
                  source={require('../../places2be/assets/images/Bookmark.png')}
                  style={[
                    styles.rightButton,
                    { tintColor: isBookmarked ? 'purple' : 'black' }, // Change color to indicate bookmark status
                  ]}
                />
              </TouchableOpacity>
            )}
            {includeLogOut && (
              <TouchableOpacity onPress={() => navigation.push('/')}>
                <Image
                  source={require('../../places2be/assets/images/LogOut.png')}
                  style={styles.rightButton}
                />
              </TouchableOpacity>
            )}
          </>
        )}
        <View style={styles.backButtonContainer}>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    position: 'relative',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 16,
  },
  rightButton: {
    width: 30,
    height: 30,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  addPhotoButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  addPhotoButton: {
    width: 30,
    height: 30,
  },
});

export default Header;
