import React from 'react';
import { StyleSheet, View } from 'react-native';

const ColorBlock = ({ height, isWhite }) => (
  <View 
    style={[
      styles.topContainer, 
      { 
        height: height, 
        backgroundColor: isWhite ? '#FFFFFF' : '#D1C4E9' // Conditionally apply background color
      }
    ]}
  />
);

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
  },
});

export default ColorBlock;
