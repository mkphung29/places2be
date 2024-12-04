import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; 
import Header from '../../components/Header.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import placeData from '../../data.json';  // Import data.json
import NavBar from '../../components/NavBar.jsx';
// import { ImageBackground } from 'react-native-web';
// import LinearGradient from 'react-native-linear-gradient';

const Card = ({placeName, photoUrls, objectId}) => {
  return(
    <TouchableOpacity
      onPress={() => {
        router.push(`(main)/Place/${objectId}`);
      }}>
      <View style={styles.card}>
        <Image source= {{uri: photoUrls[0] }} style={styles.image}/>
        {/* <LinearGradient
         colors={['#00000000', '#000000']} 
         style={{height : '100%', width : '100%'}}>
       
        </LinearGradient> */}
        
        <Text style={styles.title}>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const DiscoverScreen = () => {
    return(
        <View style={{ backgroundColor: '#D1C4E9', flex: 1 , height: '100%', width: '100%'}}>
        <ColorBlock height={60} />
        <Header text={"Discover"}/>

        <ScrollView style={styles.list}>
            {placeData.map(({placeName, photoUrls, objectId}, index) => (
              <Card key={index} placeName={placeName} photoUrls={photoUrls} objectId={objectId}/>
            ))}
            <ColorBlock height = {100}/>
        </ScrollView>
        <NavBar/>
      </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#D1C4E9',
    // },
    list: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 5,
        borderColor: '#FFDAB9',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    title:{
        padding: 12,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    }

});

export default DiscoverScreen;