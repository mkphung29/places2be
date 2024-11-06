import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Bookmark = ({name, url}) => {
    return (
        <TouchableOpacity>
            <View style = {styles.bookmarkContainer}>
                <Image source = {{ uri: url }} style = {styles.placePhoto} />
                <Text style = {styles.locationText}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#d9d9d9',
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    placePhoto: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    locationText : {
        fontSize: 20,
        justifyContent: 'center',
    }

});

export default Bookmark