import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Function to load fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Bricolage': require('../../assets/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf'),
  });
};

// Bookmarks Component that takes a list of places
const Bookmarks = ({ places }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {places.map((place, index) => (
          <Place 
            key={index}
            photoUrl={place.photoUrl}
            placeName={place.placeName}
            placeDescription={place.placeDescription}
          />
        ))}
      </ScrollView>
    </View>
)};

// Header Component
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Bookmarks</Text>
  </View>
);

// Place Component with clickable photo
const Place = ({ photoUrl, placeName, placeDescription }) => {
  const handlePhotoPress = () => {
    console.log(`Photo of ${placeName} clicked!`);
    // Implement navigation or action you want to take on click
  };

  return (
    <View style={styles.placeContainer}>
      <TouchableOpacity onPress={handlePhotoPress} style={styles.placeContainer}>
        <Image
          source={{ uri: photoUrl }}
          style={styles.placePhoto}
        />
      </TouchableOpacity>
      <Text style={styles.placeName}>{placeName}</Text>
      <Text style={styles.placeDescription}>{placeDescription}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    paddingVertical: 10,
    marginHorizontal: -40,
    marginBottom: 0,
  },
  headerText: {
    fontFamily: 'Bricolage',
    fontSize: 20,
    textAlign: 'center',
  },
  placeContainer: {
    padding: 8,
    alignItems: 'center',
    
  },
  placePhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeName: {
    fontFamily: 'Bricolage',
    fontSize: 18,

  },
  placeDescription: {
    fontFamily: 'Bricolage',
    fontSize: 16,
    textAlign: 'center',
  },
});

// Main App Component that loads fonts and renders Bookmarks component
const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const samplePlaces = [
    {
      photoUrl: "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
      placeName: 'Bobst Library',
      placeDescription: "The Elmer Holmes Bobst Library, located at New York University (NYU) in Manhattan, serves as a central hub for academic research and study.",
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1U01ANkxTwM2r0-98ys1ttMw3ahbeB3Tx",
      placeName: "John Paulson Center",
      placeDescription: "NYU’s John A. Paulson Center at 181 Mercer Street is a cutting-edge academic, arts, and athletic facility designed to foster interdisciplinary collaboration, sustainability, and community engagement.",
    },
  ];

  return <Bookmarks places={samplePlaces} />;
};

export default App;
