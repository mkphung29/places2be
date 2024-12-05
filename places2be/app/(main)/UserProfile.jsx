import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get the current user
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore functions
import Header from '../../components/Header.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import NavBar from '../../components/NavBar.jsx';
import Bookmark from '../../components/Bookmark.jsx'; // Assuming you already have a Bookmark component
import Comment from '../../components/Comment.jsx'; // Assuming you already have a Comment component
import S from '../../components/Stats.jsx'; // Assuming you already have a Stats component
import MapView from 'react-native-maps'; // Import MapView for the map component

// ProfilePic Component
const ShowProfilePic = () => {
  return (
    <View style={styles.profilePicContainer}>
      <Image
        source={require('../../assets/images/defaultPFP.png')}
        style={styles.profilePic}
      />
    </View>
  );
};

// ProfileInfo Component
const ProfileInfo = ({ numberFriends, numberComments, numberSaves }) => {
  return (
    <View style={styles.profInfoCont}>
      <ShowProfilePic />
      <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 5,
            right: 10,
          }}
        >
          <S category={"Friends"} number={numberFriends} />
          <S category={'Comments'} number={numberComments} />
          <S category={'Saves'} number={numberSaves} />
        </View>
      </View>
    </View>
  );
};

// UserProfileScreen Component
const UserProfileScreen = () => {
  const [placeData, setPlaceData] = useState([]); // State to hold the user's saved places
  const [username, setUsername] = useState(''); // State for the username
  const [numberFriends, setNumberFriends] = useState(0); // State for friends count
  const [numberComments, setNumberComments] = useState(0); // State for comments count
  const [numberSaves, setNumberSaves] = useState(0); // State for saves count
  const db = getFirestore(); // Firestore initialization
  const auth = getAuth(); // Firebase Auth initialization
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Get the user's document
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Get user data from Firestore
          const userData = userDoc.data();
          setUsername(userData.username); // Set username
          setNumberFriends(userData.numberFriends || 0); // Set number of friends
          setNumberComments(userData.numberComments || 0); // Set number of comments
          setNumberSaves(userData.numberSaves || 0); // Set number of saves

          // Get the saved places from the user's document
          const savedPlaces = userData.savedPlaces || [];
          const placesData = [];

          // Fetch places based on the saved place IDs (objectId)
          for (let objectId of savedPlaces) {
            const placeRef = doc(db, 'places', objectId);
            const placeDoc = await getDoc(placeRef);

            if (placeDoc.exists()) {
              placesData.push(placeDoc.data());
            }
          }
          setPlaceData(placesData); // Set the fetched place data
        } else {
          console.log("No user document found");
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Set an initial region for the map (for example, New York City)
  const initRegion = {
    latitude: 40.7291,
    longitude: -73.9965,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <ColorBlock height={60} />
      <Header text={`@${username}`} includeLogOut = {true} />
      <ScrollView style={{width: "95%"}}>
      <ColorBlock height={10} />
      <View style={{ height: 120, width: '100%', borderWidth: 1, borderRadius: 16, backgroundColor: 'white' }}>
        <ProfileInfo numberFriends={numberFriends} numberComments={numberComments} numberSaves={numberSaves} />
      </View>
      <ColorBlock height={10} />
      <MapView
        style={styles.map}
        initialRegion={initRegion}
        zoomEnabled={true}
        scrollEnabled={true}
      />
      <ColorBlock height={10} />
      <SavedPlaces places={placeData} username = {username}/>
      <ColorBlock height={100} />
      </ScrollView>
      <NavBar styles={styles.navBar} />
    </View>
  );
};

// SavedPlaces Component to display saved places
const SavedPlaces = ({ places, username }) => {
  return (
    <View style={styles.placesCont}>
      <View style={{ borderBottomWidth: 1, backgroundColor: '#FFDAB9', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <Text style={{ textAlign: 'center', padding: 3, fontSize: 20, marginBottom: 3, fontWeight: 'bold' }}>@{username}'s Bookmarks</Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, borderRadius: 16, paddingTop: 10 }}>
          {places.map(({ placeName, photoUrls, address, objectId }, index) => (
            <Bookmark key={index} placeName={placeName} photoUrls={photoUrls} address={address} objectId={objectId} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#D1C4E9',
  },
  profInfoCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  usernameText: {
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },
  profilePic: {
    height: '100%',
    width: '100%',
  },
  profilePicContainer: {
    height: 120,
    width: 120,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 20,
  },
  map: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  placesCont: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 16,
  },
  navBar: {
    alignSelf: 'flex-end',
  },
});

export default UserProfileScreen;
