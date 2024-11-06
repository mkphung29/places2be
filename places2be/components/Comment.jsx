import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { ScrollView, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Comment = ({ review, profilePicUrl, onLikePress }) => {
  const defaultProfilePicUrl = require('../../places2be/assets/images/defaultPFP.png');
  const likeButtonUrl = require('../../places2be/assets/images/like.png');

  return (
    <View style={styles.reviewContainer}>
      <Image 
        source={profilePicUrl ? { uri: profilePicUrl } : defaultProfilePicUrl}
        style={styles.profilePic} 
      />
      <View style={styles.reviewContent}>
        <Text style={styles.placeReviewText}>{review}</Text>
        <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
          <Image source={likeButtonUrl} style={styles.likeButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    reviewContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 16,
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
      //fontFamily: 'Bricolage',
      fontSize: 17,
      //fontStyle: 'italic',
      flex: 1,
    },
    likeButtonImage: {
      marginLeft: 10,
      width: 79 * (30 / 99),
      height: 30,
    },
  });

export default Comment;