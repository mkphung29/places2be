import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Header = ({ text, includeSave, includeBack }) => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View style={styles.headerContainer}>
      {includeBack && (
        <TouchableOpacity 
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()} // Navigate back on press
        >
          <Image
            source={require('../../places2be/assets/images/backArrow.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{text}</Text>
      {includeSave && (
        <TouchableOpacity style={styles.saveButtonContainer}>
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
    borderWidth: 1,
    marginLeft: -1,
    marginRight: -1,
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
