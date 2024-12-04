import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { SearchBar } from 'react-native-screens';
import Header from '../../components/Header.jsx';
import ColorBlock from '../../components/ColorBlock.jsx';
import NavBar from '../../components/NavBar.jsx';
import { TouchableOpacity } from 'react-native';
import Bookmark from '../../components/Bookmark.jsx';
import placeData from '../../data.json';  // Import data.json
import S from '../../components/Stats.jsx';





const ShowProfilePic = () => {
    return(
        <View style = {styles.profilePicContainer}>
            <Image 
                source={require('../../assets/images/defaultPFP.png')}
                style = {styles.profilePic}
                />
        </View>
    );
};

//MAP!
const initRegion={
    latitude: 40.7291,
    longitude: -73.9965,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,

  };
const Map = () => {
    
    return(
        <View style={styles.mapContainer}>
        <MapView
            style={styles.map}
            styleUrl={`https://api.maptiler.com/maps/streets-v2-dark/style.json?key=Qr3kbzWfBOmee8MB9sfO`}
            initialRegion={initRegion}
            zoomEnabled={true}
            scrollEnabled={true}
        >
      </MapView>
    </View>
    );
};


const ProfileInfo = () => {
    return(
        <View style = {styles.profInfoCont}>
            <ShowProfilePic/>
            <View style={{flex:1, justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                <View style={{flexDirection:'row',
                            justifyContent: 'space-around',
                            padding: 5,
                            right:10
                            }}>
                    <S catergory={'Friends'} number={'0'} />
                    <S catergory={'Comments'} number={'0'} />
                    <S catergory={'Saves'} number={'0'} />
                    
                </View>
                
            </View>
            
        </View>
    );
};
const SavedPlaces = () => {
    return(
        <View style={styles.placesCont}>
            <View style={{borderBottomWidth: 1, backgroundColor: '#FFDAB9', borderTopLeftRadius:16, borderTopRightRadius:16}}> 
            <Text style={{textAlign: 'center', padding: 3, fontSize: 20,marginBottom:3,}}>@username's Bookmarks</Text>
            </View>
            
            <View style={{flex: 1, }}>            
            <ScrollView style={{flex:1, borderRadius:16,paddingTop: 10, marginBottom: 80}}>
                {placeData.map(({ placeName, photoUrls, address, objectId }, index) => (
                <Bookmark key={index} placeName={placeName} photoUrls={photoUrls} address = {address} objectId = {objectId} />
                 ))}
                 <ColorBlock height={10} isWhite={true} />
            </ScrollView>
            </View>  
        </View>
    );
}
//Put together all the components
const UserProfileScreen = () => {
    return(
        <View style={styles.container}>
            <ColorBlock height={60} />
            <Header text={"@username"}/>
            <ColorBlock height={10} />
            <View style={{height:120,
                          width: '95%',
                          borderWidth: 1,
                          borderRadius: 16,
                          backgroundColor: 'white',
                            }}>
                <ProfileInfo/>
            </View>
            <ColorBlock height={10} />
            <Map />
            <ColorBlock height={10} />
            <SavedPlaces />
            <ColorBlock height={10} />
            <NavBar styles= {styles.navBar}/>
        </View>

        
    );
};

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#D1C4E9',
    },

    profInfoCont:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    usernameText: {
        textAlign:'center',
        fontSize: 20,
        textDecorationLine: 'underline',
        justifyContent: 'center',
    },
    profilePic: {
        height: '100%', 
        width: '100%',
        // resizeMode: 'cover',
    },
    profilePicContainer: {
        height: 120,
        width: 120,
        borderRadius: 50,
        overflow: 'hidden',
        padding: 20,
        
    },
    mapContainer: {
        width: '95%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    navBar: {
        alignSelf: 'flex-end',
    },
    placesCont: {
        flexDirection: 'column',
        flex: 1,
        width: '95%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 16,
        
    },
});
export default UserProfileScreen;