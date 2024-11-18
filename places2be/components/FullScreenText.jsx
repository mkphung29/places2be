import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';

const FullScreenText = ({ description, address }) => {
  const openAppleMaps = (address) => {
    const url = `http://maps.apple.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.innerContainer}>
      <Text style={styles.placeDescriptionText}>{description}</Text>
      <TouchableOpacity onPress={() => openAppleMaps(address)}>
        <Text style={styles.addressText}>{address}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  placeDescriptionText: {
    fontSize: 17,
    textAlign: 'left',
    padding: 16,
  },
  addressText: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    fontSize: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
    fontStyle: 'italic',
    textAlign: 'left',
    padding: 16,
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
});

export default FullScreenText;
