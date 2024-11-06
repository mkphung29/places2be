import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const HorizontalCarousel = ({ photoUrls }) => (
    <ScrollView horizontal pagingEnabled style={styles.photoContainer}>
      {photoUrls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.placePhoto} />
      ))}
    </ScrollView>
  );

const styles = StyleSheet.create({
    photoContainer: {
      width: '100%',
      height: 300,
      padding: 16,
    },
    placePhoto: {
      width: 300,
      height: 284,
      borderRadius: 16,
      marginRight: 16,
    },
  });

export default HorizontalCarousel;