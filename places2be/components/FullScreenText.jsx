import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const FullScreenText = ({ description }) => (
    <Text style={styles.placeDescriptionText}>{description}</Text>
  );

const styles = StyleSheet.create({
    placeDescriptionText: {
      fontSize: 17,
      textAlign: 'left',
      width: '100%',
      padding: 16,
    },
  });

export default FullScreenText;