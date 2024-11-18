import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, Linking } from 'react-native';
import { useRouter } from 'expo-router';


const Bookmark = ({ placeName, photoUrls, address, objectId }) => {
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
        <View style={styles.textContainer}>
          <Text style={styles.locationText}>{placeName}</Text>
            <View style = {styles.addressContainer}>
                <Text style={styles.addressText}>{address}</Text>
            </View>
        </View>
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
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  addressContainer: {
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  locationText: {
    fontSize: 20,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  addressText: {
    fontSize: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
    fontStyle: 'italic',
  }
});

export default Bookmark;
