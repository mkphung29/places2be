import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const Header = ({ text, includeSave, includeBack }) => {
  const navigation = useRouter(); // Get the navigation object

  return (

    //Header
    <View style={styles.headerContainer}>

      {/*Including a clickable back button which routes to the previous page*/}
      {includeBack && (
        <TouchableOpacity 
          style={styles.backButtonContainer}
          onPress={() => navigation.back()} //Navigates backward on press of button
        >
          {/*Setting up the back button icon*/}
          <Image
            source={require('../../places2be/assets/images/backArrow.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      )}

      {/*The text that should lie in the header*/}
      <Text style={styles.headerText}>{text}</Text>

      {/*Including a clickable bookmark button*/}
      {includeSave && (
        <TouchableOpacity 
          style={styles.saveButtonContainer}
          //onPress unimplemented...
        >
          {/*Setting up the bookmark button icon*/}
          <Image
            source={require('../../places2be/assets/images/bookmark.png')}
            style={styles.saveButton}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    position: 'relative',
    borderColor: 'black',
    borderBottomWidth:1,
    borderTopWidth:1,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  saveButtonContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 16,
  },
  saveButton: {
    width: 30,
    height: 30,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    paddingLeft: 16,
  },
  backButton: {
    width: 30,
    height: 30,
  },
});

export default Header;
