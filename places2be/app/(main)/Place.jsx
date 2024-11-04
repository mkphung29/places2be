import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Function to load fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Bricolage': require('../../assets/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf'),
  });
};

// Main Place Component
const Place = ({ locationName, photoUrls, description, reviews }) => {
  const handleLikePress = () => {
    console.log('Liked!');
    //CHANGE THIS TO IMPLEMENT THE LIKE FUNCTION
  }

  const handleSavePress = () => {
    console.log('Saved!');
    //CHANGE THIS TO IMPLEMENT THE SAVE FUNCTION
  }

  return (
    <View style={styles.container}>
      <Header text={locationName} onSavePress={handleSavePress} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <PlacePhoto photoUrls={photoUrls} />
        <PlaceDescription description={description} />
        <Header text="Comments" />
        {reviews.map((review, index) => (
          <PlaceReview key={index} review={review} onLikePress={handleLikePress} />
        ))}
      </ScrollView>
    </View>
    
  );
};

// Header Component with Save Button
const Header = ({ text, onSavePress }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{text}</Text>
    {onSavePress && (
      <TouchableOpacity onPress={onSavePress} style={styles.saveButtonContainer}>
        <Image
          source={{ uri: "https://drive.google.com/uc?id=1pUDN2Etcgab4_aoF9fJaN7cr5sWuV8AV" }}
          style={styles.saveButton}
        />
      </TouchableOpacity>
    )}
  </View>
);

// PlacePhoto Component with horizontal scroll
const PlacePhoto = ({ photoUrls }) => (
  <ScrollView horizontal pagingEnabled style={styles.photoContainer}>
    {photoUrls.map((url, index) => (
      <Image key={index} source={{ uri: url }} style={styles.placePhoto} />
    ))}
  </ScrollView>
);

// PlaceDescription Component
const PlaceDescription = ({ description }) => (
  <Text style={styles.placeDescriptionText}>{description}</Text>
);

// PlaceReview Component
const PlaceReview = ({ review, profilePicUrl, onLikePress }) => {
  const defaultProfilePicUrl = "https://drive.google.com/uc?id=1ihy8T75PTEKQ5cUPfJyf8gUCic0jaCDt"; 
  const likeButtonUrl = "https://drive.google.com/uc?id=1CieMQlymV-_G4Fy0YOK2wduk67Vga0B6";

  return (
    <View style={styles.reviewContainer}>
      <Image 
        source={{ uri: profilePicUrl || defaultProfilePicUrl }}
        style={styles.profilePic} 
      />
      <View style={styles.reviewContent}>
        <Text style={styles.placeReviewText}>{review}</Text>
        <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
          <Image source={{ uri: likeButtonUrl }} style={styles.likeButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    padding: 0,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 10,
    marginHorizontal: 0,
    position: 'relative',
  },
  headerText: {
    fontFamily: 'Bricolage',
    fontSize: 20,
    textAlign: 'center',
  },
  saveButtonContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 32,
  },
  saveButton: {
    width: 30,
    height: 30,
  },
  photoContainer: {
    width: '100%',
    height: 300,
    padding: 16,
  },
  placePhoto: {
    width: 300,  // Set width for each photo
    height: '100%',
    borderRadius: 10,
    marginRight: 10,
  },
  placeDescriptionText: {
    fontFamily: 'Bricolage',
    fontSize: 17,
    textAlign: 'left',
    width: '100%',
    padding: 16,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  placeReviewText: {
    fontFamily: 'Bricolage',
    fontSize: 17,
    fontStyle: 'italic',
    flex: 1,
  },
  likeButtonImage: {
    marginLeft: 10,
    width: 79 * (30 / 99),
    height: 30,
  },
});

// App Component that loads fonts and renders Place component
const place = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Place 
      locationName="BOBST LIBRARY"
      photoUrls={[
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat"
      ]}
      description="The Elmer Holmes Bobst Library, located at New York University (NYU) in Manhattan, serves as a central hub for academic research and study."
      reviews={[
        "Bobst Library has been my second home throughout my time at NYU. The building itself is incredible—imagine studying under a 12-story atrium with a stunning geometric ceiling! The space is so inspiring and keeps you focused. They have endless resources, from rare books to cutting-edge research tools. And if you need a quiet spot, there are multiple silent floors where you can truly get in the zone.",
        "Love the atmosphere.",
        "Could use more seating.",
        "The library is a must for anyone serious about studying. You have access to millions of books, digital resources, and archives—everything you’d ever need. That said, Bobst is popular, and sometimes it’s hard to find a good seat, especially during finals. The views from the upper floors of Washington Square Park are a big plus!",
      ]}
    />
  );
};

export default place;