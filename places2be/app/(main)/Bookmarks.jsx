import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../../components/Header.jsx';
import Bookmark from '../../components/Bookmark.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import placeData from '../../data.json';  // Import data.json

const Bookmarks = ({ places }) => {
  return (
    <View style={{ backgroundColor: '#D1C4E9' }}>
      <ColorBlock height={60} />
      <Header text={"Bookmarks"} includeBack={true}/>
      <ScrollView>
        <ColorBlock height={10} />
        {places.map(({ placeName, photoUrl }, index) => (
          <Bookmark key={index} placeName={placeName} photoUrls={[photoUrl]} />
        ))}
        <ColorBlock height={130} />
      </ScrollView>
    </View>
  );
};

const bookmarks = () => {
  // Pass the imported placeData to Bookmarks component
  return <Bookmarks places={placeData} />;
};

export default bookmarks;
