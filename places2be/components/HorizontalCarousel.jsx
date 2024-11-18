import React from 'react';
import { ScrollView, Image, StyleSheet, Text} from 'react-native';

const HorizontalCarousel = ({ photoUrls }) => (
    <ScrollView horizontal pagingEnabled style={styles.photoContainer} showsHorizontalScrollIndicator={false}>
      {photoUrls.map((url, index) => (
        <Image key={index} source={{uri : url}} style={styles.placePhoto} />
      ))}
      <Text>   </Text>
    </ScrollView>
  );

const styles = StyleSheet.create({
    photoContainer: {
      width: '100%',
      height: 275,
      backgroundColor: '#D1C4E9',
      marginBottom: 10,
      marginRight: 10,
    },
    placePhoto: {
      width: 275,
      height: 275,
      borderRadius: 16,
      borderColor: 'black',
      borderWidth: 1,
      marginLeft: 15,
    },
  });

export default HorizontalCarousel;