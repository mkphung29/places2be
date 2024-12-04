import React from 'react';
import {View, Image, Button, StyleSheet, Text,} from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const NavBar = () => {
    return(
        <View style={styles.bar}>
           <TouchableOpacity onPress={() => router.push('(main)/Discover')}>
            <View style={styles.button}>
                <Image style={{flex:1,
                               height:'100%',
                               width: '100%'}}
                               source={require('../assets/images/Search.png')}/>
            </View>
           </TouchableOpacity>
          
           <TouchableOpacity  onPress={() => router.push('(main)/MapPage')}>
            <View style={styles.button}>
                <Image style={{flex:1,
                               height:'100%',
                               width: '100%'}}
                               source={require('../assets/images/Map.png')}/>
            </View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => router.push('(main)/Bookmarks')}>
            <View style={styles.button}>
                <Image style={{flex:1,
                               height:'100%',
                               width: '100%'}}
                               source={require('../assets/images/Bookmark.png')}/>
            </View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => router.push('(main)/UserProfile')}>
            <View style={styles.button}>
            <Image style={{flex:1,
                            height:'100%',
                            width: '100%'}}
                   source={require('../assets/images/defaultPFP.png')}/>
            </View>
           </TouchableOpacity>
           
        </View>
        
    );

};

const styles = StyleSheet.create({
    bar:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 92,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        
    },
    button:{
        //flex:1,
        width: 79,
        height: '100%',
        padding: 20,
        paddingBottom: 32,
        //overflow: 'hidden',
    }

}) 

export default NavBar;

// export default NavBar;

//User profile
//Discover Page
//Bookmarks

