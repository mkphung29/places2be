import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get the current user

const NavBar = () => {
    // Get the current user’s UID directly from Firebase Authentication
    const auth = getAuth();
    const user = auth.currentUser; // Get the current user

    return (
        <View style={styles.bar}>
            {/* Discover Icon */}
            <TouchableOpacity onPress={() => router.push('(main)/Discover')}>
                <View style={styles.button}>
                    <Image 
                        style={styles.icon} 
                        source={require('../assets/images/Search.png')} 
                    />
                </View>
            </TouchableOpacity>

            {/* Map Page Icon */}
            <TouchableOpacity onPress={() => router.push('(main)/MapPage')}>
                <View style={styles.button}>
                    <Image 
                        style={styles.icon} 
                        source={require('../assets/images/Map.png')} 
                    />
                </View>
            </TouchableOpacity>

            {/* Bookmarks Icon */}
            <TouchableOpacity onPress={() => router.push('(main)/Bookmarks')}>
                <View style={styles.button}>
                    <Image 
                        style={styles.icon} 
                        source={require('../assets/images/Bookmark.png')} 
                    />
                </View>
            </TouchableOpacity>

            {/* User Profile Icon */}
                <TouchableOpacity onPress={() => router.push(`(main)/UserProfile`)}>
                    <View style={styles.button}>
                        <Image 
                            style={styles.icon} 
                            source={require('../assets/images/defaultPFP.png')} 
                        />
                    </View>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        flex: 1,
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
    button: {
        flex: 1,
        width: 80,
        height: 80,
        padding: 20,
        paddingBottom: 32,
        overflow: 'hidden',
    },
    icon: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});

export default NavBar;
