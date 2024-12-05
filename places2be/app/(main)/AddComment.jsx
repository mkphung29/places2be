import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { db, auth } from '../(auth)/firebaseConfig'; // Import Firebase
import { updateDoc, arrayUnion, doc, increment } from 'firebase/firestore';

const AddComment = ({ objectId }) => {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!comment) {
      setErrorMessage("Please enter a comment:");
      setModalVisible(true);
      return;
    }

    try {
      const currentUser = auth.currentUser;

      // Reference to user's document
      const userRef = doc(db, 'users', currentUser.uid);

      // Reference to place's document
      const placeRef = doc(db, 'places', objectId);

      // Update the user's document by adding the comment to the 'comments' array
      await updateDoc(userRef, {
        comments: arrayUnion({objectId, comment}),
        numberComments: increment(1),
      });

      // Update the place's document by adding the comment to the 'reviews' array
      await updateDoc(placeRef, {
        reviews: arrayUnion({uid: currentUser.uid, comment}),
      });

      setSuccessMessage("Comment added successfully!");
      setModalVisible(true);
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (successMessage) {
      router.back(); // Navigate back after a successful comment submission
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

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Add a Comment</Text>
            <TextInput
              placeholder="Write your comment here..."
              value={comment}
              onChangeText={setComment}
              style={styles.inputField}
              multiline
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit Comment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: 'transparent', // Ensure transparency to see the background image
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
    padding: 20, 
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
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Align text to the top for multiline input
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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

export default AddComment;
