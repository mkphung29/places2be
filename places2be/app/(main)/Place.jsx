import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Comment from '../../components/Comment.jsx';
import Header from '../../components/Header.jsx';
import HorizontalCarousel from '../../components/HorizontalCarousel.jsx';
import FullScreenText from '../../components/FullScreenText.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';

<<<<<<< HEAD
const Place = () => {
  return (
    <div>place</div>
  )
}

export default Place
=======
const Place = ({ placeName, photoUrls, description, reviews }) => {
    return (
      <View style = {{backgroundColor: '#D1C4E9'}}>
        <ColorBlock height = {60}></ColorBlock>
        <Header text = {placeName} includeSave = {true} includeBack = {true}/>
        <ScrollView>
          <ColorBlock height = {10}></ColorBlock>
          <HorizontalCarousel photoUrls = {photoUrls} />
          <FullScreenText description = {description} />
          <Header text = "Comments" />
          <ColorBlock height = {10}></ColorBlock>
          {reviews.map((review, index) => (
            <Comment key = {index} review = {review}/>
          ))}
          <ColorBlock height = {130}></ColorBlock>
        </ScrollView>
      </View>
     
    );
   };
   
export default Place;
>>>>>>> chase
