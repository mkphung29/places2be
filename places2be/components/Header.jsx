import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Header = ({ text, includeSave }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{text}</Text>
      {includeSave && (
        <TouchableOpacity style={styles.saveButtonContainer}>
          <Image
            source={require('../../places2be/assets/images/bookmark.png')}
            style={styles.saveButton}
          />
        </TouchableOpacity>
      )}
    </View>
  );

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      paddingVertical: 10,
      position: 'relative',
    },
    headerText: {
      fontSize: 20,
      textAlign: 'center',
    },
    saveButtonContainer: {
      position: 'absolute',
      right: 0,
      paddingRight: 16,
    },
    saveButton: {
      width: 30,
      height: 30,
    },
  });
  
export default Header;