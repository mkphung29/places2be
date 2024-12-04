import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { router, useRouter } from 'expo-router';

const Header = ({ text, includeSave, includeBack, includeLogOut }) => {
  const navigation = useRouter(); // Get the navigation object

  return (
    // Header
    <View style={styles.headerContainer}>
      {/* Including a clickable back button which routes to the previous page */}
      {includeBack && (
        <TouchableOpacity 
          style={styles.backButtonContainer}
          onPress={() => navigation.back()} // Navigates backward on press of button
        >
          {/* Setting up the back button icon */}
          <Image
            source={require('../../places2be/assets/images/backArrow.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      )}

      {/* The text that should lie in the header */}
      <Text style={styles.headerText}>{text}</Text>

      {/* Conditionally render either the bookmark or logout button */}
      <View style={styles.rightButtonContainer}>
        {includeSave && !includeLogOut && (
          <TouchableOpacity>
            {/* Setting up the bookmark button icon */}
            <Image
              source={require('../../places2be/assets/images/Bookmark.png')}
              style={styles.rightButton}
            />
          </TouchableOpacity>
        )}
        {includeLogOut && !includeSave && (
          <TouchableOpacity  onPress={() => router.push('/')}>
            {/* Setting up the logout button icon */}
            <Image
              source={require('../../places2be/assets/images/LogOut.png')}
              style={styles.rightButton}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    position: 'relative',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 16,
  },
  rightButton: {
    width: 30,
    height: 30,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  backButton: {
    width: 30,
    height: 30,
  },
});

export default Header;
