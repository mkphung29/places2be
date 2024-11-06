import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Comment from '../../components/Comment.jsx';
import Header from '../../components/Header.jsx';
import HorizontalCarousel from '../../components/HorizontalCarousel.jsx';
import FullScreenText from '../../components/FullScreenText.jsx';

// Main Place Component
const Place = ({ locationName, photoUrls, description, reviews }) => {
  return (
    <View>
      <Header text = {locationName} includeSave = {true}/>
      <ScrollView>
        <HorizontalCarousel photoUrls = {photoUrls} />
        <FullScreenText description = {description} />
        <Header text = "Comments" />
        {reviews.map((review, index) => (
          <Comment key = {index} review = {review}/>
        ))}
        <Text>
          {"\n"}
        </Text>
      </ScrollView>
    </View>
    
  );
};

// App Component that loads fonts and renders Place component
const place = () => {
  return (
    <Place 
      locationName = "BOBST LIBRARY"
      photoUrls = {[
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat",
        "https://drive.google.com/uc?id=1M07dBHn4p-mZLSqlspLh_iFYkjZfiGat"
      ]}
      description = "The Elmer Holmes Bobst Library, located at New York University (NYU) in Manhattan, serves as a central hub for academic research and study."
      reviews = {[
        "Bobst Library has been my second home throughout my time at NYU. The building itself is incredible—imagine studying under a 12-story atrium with a stunning geometric ceiling! The space is so inspiring and keeps you focused. They have endless resources, from rare books to cutting-edge research tools. And if you need a quiet spot, there are multiple silent floors where you can truly get in the zone.",
        "Love the atmosphere.",
        "Could use more seating.",
        "The library is a must for anyone serious about studying. You have access to millions of books, digital resources, and archives—everything you’d ever need. That said, Bobst is popular, and sometimes it’s hard to find a good seat, especially during finals. The views from the upper floors of Washington Square Park are a big plus!",
      ]}
    />
  );
};

export default place;