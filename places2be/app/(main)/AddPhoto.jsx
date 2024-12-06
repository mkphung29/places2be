import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { db, auth } from '../(auth)/firebaseConfig'; // Import Firebase
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';

const AddPhotoUrl = ({ objectId }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!photoUrl) {
      setErrorMessage("Please enter a photo URL.");
      setModalVisible(true);
      return;
    }

    // Ensure the photo URL starts with 'http' and matches common image file extensions
    const isValidUrl = photoUrl.startsWith('http') && /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(photoUrl);
    if (!isValidUrl) {
      setErrorMessage("Please provide a valid photo URL.");
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

      // Reference to the place's document using objectId
      const placeRef = doc(db, 'places', objectId);

      // Update the place's document by adding the photo URL to the 'photoUrls' array
      await updateDoc(placeRef, {
        photoUrls: arrayUnion(photoUrl), // Adds the photo URL to the photoUrls field
      });

      setSuccessMessage("Photo URL added successfully!");
      setModalVisible(true);
      setPhotoUrl(''); // Clear the photo URL input
    } catch (error) {
      console.error("Error adding photo URL:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (successMessage) {
      router.push("(main)/Place/${objectId}"); // Navigate back after successful URL submission
    }
  };

  useEffect(() => {
    if (successMessage) {
      // Navigate back to previous screen after modal is closed
      router.back();
    }
  }, [modalVisible, successMessage]);

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
          <Text style={styles.title}>Add a Photo</Text>
          <TextInput
            placeholder="Enter photo URL"
            value={photoUrl}
            onChangeText={setPhotoUrl}
            style={styles.inputField}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit Photo URL</Text>
          </TouchableOpacity>
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
  formContainer: {
    width: '100%',
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

export default AddPhotoUrl;
