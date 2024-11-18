import React from 'react';
import { StyleSheet, View } from 'react-native';

const ColorBlock = ({ height }) => (
  <View style={[styles.topContainer, { height: height }]}></View> // Apply height dynamically
);

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    backgroundColor: '#D1C4E9', // Light purple background
  },
});

export default ColorBlock;
