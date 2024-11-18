import React from 'react';
import { ScrollView, View } from 'react-native';
import Comment from '../../components/Comment.jsx';
import Header from '../../components/Header.jsx';
import HorizontalCarousel from '../../components/HorizontalCarousel.jsx';
import FullScreenText from '../../components/FullScreenText.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';

const Place = ({ placeName, photoUrls, description, reviews, address }) => {
    return (
      <View style = {{backgroundColor: '#D1C4E9'}}>
        <ColorBlock height = {60}></ColorBlock>
        <Header text = {placeName} includeSave = {true} includeBack = {true}/>
        <ScrollView>
          <ColorBlock height = {10}></ColorBlock>
          <HorizontalCarousel photoUrls = {photoUrls} />
          <FullScreenText description = {description} address = {address}/>
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
