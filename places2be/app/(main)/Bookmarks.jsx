import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header.jsx';
import Bookmark from '../../components/Bookmark.jsx';

const Bookmarks = ({ places }) => {
  return (
    <View>
      <Header text = {"Bookmarks"}></Header>
      <ScrollView>
        {places.map(({ placeName, photoUrl }, index) => (
          <Bookmark key={index} name={placeName} url={photoUrl} />
        ))}
      </ScrollView>
    </View>
  );
};

const bookmarks = () => {
  const samplePlaces = [
    {
      photoUrl: "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
      placeName: 'Bobst Library',
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1U01ANkxTwM2r0-98ys1ttMw3ahbeB3Tx",
      placeName: "John Paulson Center",
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
      placeName: 'Bobst Library',
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1U01ANkxTwM2r0-98ys1ttMw3ahbeB3Tx",
      placeName: "John Paulson Center",
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
      placeName: 'Bobst Library',
    },
    {
      photoUrl: "https://drive.google.com/uc?id=1U01ANkxTwM2r0-98ys1ttMw3ahbeB3Tx",
      placeName: "John Paulson Center",
    },
  ];

  return <Bookmarks places={samplePlaces} />;
};

export default bookmarks;
