import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { db, auth } from '../(auth)/firebaseConfig';
import { doc, setDoc, increment, updateDoc, arrayUnion } from 'firebase/firestore';

const AddPlace = () => {
  const [placeName, setPlaceName] = useState('');
  const [photoUrls, setPhotoUrls] = useState(['', '']); // Array for two photo URLs
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePhotoUrlChange = (index, value) => {
    const updatedUrls = [...photoUrls];
    updatedUrls[index] = value;
    setPhotoUrls(updatedUrls);
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // Validate all fields
    if (!placeName || !address || !description || !comment) {
      setErrorMessage("All fields are required. Please fill them in.");
      setModalVisible(true);
      return;
    }

    const validPhotoUrls = photoUrls.filter((url) =>
      url.startsWith('http') && /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)
    );
    
    if (validPhotoUrls.length < 2) {
      setErrorMessage("Please provide at least two valid image URLs (e.g., https://example.com/photo.jpg).");
      setModalVisible(true);
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setErrorMessage("User not logged in.");
        setModalVisible(true);
        return;
      }
    
      // Generate objectId by replacing spaces in placeName with hyphens
      const objectId = placeName.trim().replace(/\s+/g, '-');
    
      // Prepare data for Firestore, including objectId as a field
      const placeData = {
        objectId, // Add objectId field
        placeName,
        photoUrls: validPhotoUrls, // Save valid photo URLs
        address,
        description,
        createdBy: currentUser.uid,
        reviews: [
          {
            uid: currentUser.uid,
            comment,
          },
        ],
        createdAt: new Date(),
      };
    
      // Add new place to Firestore with the objectId as document name
      await setDoc(doc(db, 'places', objectId), placeData);
    
      // Update user's document with the new comment and increment comment count
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        comments: arrayUnion({ objectId, comment }),
        numberComments: increment(1),
      });
    
      // Provide success feedback
      setSuccessMessage("Place added successfully!");
      setModalVisible(true);
    
      // Clear form fields
      setPlaceName('');
      setPhotoUrls(['', '']);
      setAddress('');
      setDescription('');
      setComment('');
    
    } catch (error) {
      console.error("Error adding place:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
      setModalVisible(true);
    }
    
  };
  

  const handleModalClose = () => {
    setModalVisible(false);
    if (successMessage) {
      router.back(); // Navigate back after successful submission
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image
              source={require('../../assets/images/backArrow.png')}
              style={styles.backArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Add a New Place</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Place Name"
              value={placeName}
              onChangeText={setPlaceName}
              style={styles.inputField}
            />
            {photoUrls.map((photoUrl, index) => (
              <TextInput
                key={index}
                placeholder={`Photo URL ${index + 1}`}
                value={photoUrl}
                onChangeText={(value) => handlePhotoUrlChange(index, value)}
                style={styles.inputField}
              />
            ))}
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.inputField}
            />
            <TextInput
              placeholder="Place Description"
              value={description}
              onChangeText={setDescription}
              style={[styles.inputField, { height: 100 }]}
              multiline
              textAlignVertical="top"
            />
            <TextInput
              placeholder="Your Comment"
              value={comment}
              onChangeText={setComment}
              style={[styles.inputField, { height: 100 }]}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit Place</Text>
            </TouchableOpacity>
            <Text>
              {"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"} {/* Allows user to scroll to be able to see all fields over keyboard */}
            </Text>
            </ScrollView>
          </View>
      </SafeAreaView>

      {/* Modal for error or success messages */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{errorMessage || successMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#D1C4E9',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: '#FFDAB9',
    padding: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 1000,
    padding: 20,
  },
  formContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#374151',
  },
  inputField: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFDAB9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#374151',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFDAB9',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#4B5563',
    fontWeight: 'bold',
  },
});

export default AddPlace;
