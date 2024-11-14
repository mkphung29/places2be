import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const HorizontalCarousel = ({ photoUrls }) => (
    <ScrollView horizontal pagingEnabled style={styles.photoContainer} showsHorizontalScrollIndicator={false}>
      {photoUrls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.placePhoto} />
      ))}
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