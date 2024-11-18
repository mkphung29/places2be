import React from 'react';
import {View, Button, Text, StyleSheet, Image, ScrollView} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { SearchBar } from 'react-native-screens';
import NavBar from '/Users/haelynryoo/places2be/places2be/components/NavBar.jsx';


//USER Profile pic and username
const ShowUsername = () => {
    return(
        <View>
    <Text style={styles.usernameText}>@userProfile</Text>    
</View>
    );
};
const ShowProfilePic = () => {
    return(
        <View style = {styles.profilePicContainer}>
            <Image 
    source={require('/Users/haelynryoo/places2be/places2be/assets/images/DefaultProfilePic.png')}
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
            styleUrl={`https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${process.env.MAPTILER_API_KEY}`}
            initialRegion={initRegion}
            zoomEnabled={true}
            scrollEnabled={true}
        >
      </MapView>
    </View>
    );
};

//Saved Places:
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
const SavedPlaces = () => {
    return(
        <ScrollView style={{backgroundColor: '#FFDAB9',}}>

        </ScrollView>
    );
};

const ProfileInfo = () => {
    return(
        <View style = {styles.profInfoCont}>
            <ShowProfilePic/>
            <View style={{flex:1,}}>
                <ShowUsername/>
                <View style={{flexDirection:'row',
                            justifyContent: 'space-around',
                            }}>
                    <Text style={{padding: '10px',}}> Friends</Text>
                    <Text style={{padding: '10px',}}>Saves</Text>
                    <Text style={{padding: '10px',}}>Comments</Text>
                </View>
                
            </View>
            
        </View>
    );
};

//Put together all the components
const UserProfileScreen = () => {
    return(
        <View style={styles.container}>
            <ProfileInfo/>
            <Map />
            <NavBar />
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
        resizeMode: 'cover',
    },
    profilePicContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        
    },
    mapContainer: {
        width: '95%',
        height: 300,
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

});
export default UserProfileScreen;