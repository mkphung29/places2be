import React from 'react';
import {View, Image, Button, StyleSheet, Text} from 'react-native';

const NavBar = () => {
    return(
        <View style={styles.bar}>
            <Text>Search Bar</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    bar:{
        height: 20,
        width: '90%',
        backgroundColor: 'Blue',
        borderRadius: 15,
    },

}) 

export default NavBar;

// export default NavBar;

//User profile
//Discover Page
//Bookmarks

