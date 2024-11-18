import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const FullScreenText = ({ description }) => (
    <View style = {styles.innerContainer}>
      <Text style={styles.placeDescriptionText}>{description}</Text>
      </View>
  );

const styles = StyleSheet.create({
    placeDescriptionText: {
      fontSize: 17,
      textAlign: 'left',
      padding: 16,
    },
    innerContainer : {
      backgroundColor: 'white',
      borderRadius: 16,
      borderColor: 'black',
      borderWidth: 1,
      marginLeft: 10,
      marginBottom: 10,
      marginRight: 10,
    }
  });

export default FullScreenText;