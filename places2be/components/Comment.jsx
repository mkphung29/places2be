import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Comment = ({ review, profilePicUrl, onLikePress }) => {
  const defaultProfilePicUrl = require('../../places2be/assets/images/defaultPFP.png');
  const likeButtonUrl = require('../../places2be/assets/images/Heart.png');


  return (

    <View style = {styles.outerContainer}>
    <View style={styles.innerContainer}>
      <Image 
        source={profilePicUrl ? { uri: profilePicUrl } : defaultProfilePicUrl}
        style={styles.profilePic} 
      />
      <View style={styles.reviewContent}>
        <Text style={styles.placeReviewText}>{review}</Text>
        <TouchableOpacity onPress={() => onLikePress} style={styles.likeButton}>
          <Image source={likeButtonUrl} style={styles.likeButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 16,
      borderColor: 'black',
      borderWidth: 1,
    },
    outerContainer: {
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,

    },
    profilePic: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginRight: 10,
    },
    reviewContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    placeReviewText: {
      fontSize: 17,
      flex: 1,
    },
    likeButtonImage: {
      marginLeft: 10,
      width: 30,
      height: 30,
    },
  });

export default Comment;