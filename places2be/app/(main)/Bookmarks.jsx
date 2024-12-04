import React from 'react';
import { ScrollView, View, Overlay } from 'react-native';
import Header from '../../components/Header.jsx';
import Bookmark from '../../components/Bookmark.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import placeData from '../../data.json';  // Import data.json
import NavBar from '../../components/NavBar.jsx';
// import { Overlay } from 'react-native-maps';

const Bookmarks = ({ places }) => {
  return (

    <View style={{ backgroundColor: '#D1C4E9', flex: 1, bottom: 92 }}>
      <ColorBlock height={152}/>
      <Header text={"Bookmarks"}/>
      <ScrollView>
        <ColorBlock height={10} />
        {places.map(({ placeName, photoUrls, address, objectId }, index) => (
          <Bookmark key={index} placeName={placeName} photoUrls={photoUrls} address = {address} objectId = {objectId} />
        ))}
        {/* <ColorBlock height={20} /> */}
      </ScrollView>
    </View>
  );
};


const bookmarks = () => {
  // Pass the imported placeData to Bookmarks component
  return(
    <View style={{flex:1}}>
       <Bookmarks places={placeData} />
       <NavBar />
    </View>
     
      

    
  ); 

};

export default bookmarks;
