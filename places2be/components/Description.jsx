import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { Text, StyleSheet, View } from 'react-native';

const Description = ({ description, address }) => (
    <View style={styles.descriptionContainer}>
        <Text style={styles.placeDescriptionText}>{description}</Text>
        <Text> {"\n"}</Text>
        <Text style={styles.addressText}>{address}</Text>
    </View>
);

const styles = StyleSheet.create({
    descriptionContainer: {
      flexDirection: 'column',
      padding: 16,
      backgroundColor: '#f3f3f3',
      borderRadius: 16,
      margin: 10,
      marginTop: 5,
      borderColor: '#374151',
      borderWidth: 1,
    },
    placeDescriptionText: {
        fontSize: 17,
        backgroundColor: '#f3f3f3',
    },
    addressText: {
        fontSize: 12,
        fontStyle: 'italic',
    },
});

export default Description;