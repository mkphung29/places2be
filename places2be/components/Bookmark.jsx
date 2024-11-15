import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const Bookmark = ({ placeName, photoUrls, objectId }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to the dynamic Place page
        router.push(`/Place/${objectId}`);
      }}
    >
      <View style={styles.bookmarkContainer}>
        <Image source = {{ uri: photoUrls[0] }} style={styles.placePhoto} />
        <Text style={styles.locationText}>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  placePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  locationText: {
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',

  }
});

export default Bookmark;
