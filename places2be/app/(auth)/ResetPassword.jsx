import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Adjust the import to your firebase config

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // For showing the modal
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    // Reset error and success messages
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage("Please enter your email.");
      setModalVisible(true);
      return;
    }

    try {
      // Attempt to send the password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent successfully.");
      setModalVisible(true);
      setEmail(''); // Clear the input after sending the email
    } catch (error) {
      console.error("Error sending password reset email:", error.message);

      // Define custom error messages based on the error code
      let message = "An error occurred. Please try again.";
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Please enter a valid email address.";
          break;
        case 'auth/user-not-found':
          message = "No account found with this email address.";
          break;
        default:
          message = "Something went wrong. Please try again later.";
          break;
      }

      setErrorMessage(message); // Set the error message
      setModalVisible(true); // Show modal on error
    }
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the modal immediately
  };

  // UseEffect to track when modal is closed and navigate after modal is dismissed
  useEffect(() => {
    if (successMessage) {
      router.back(); // Navigate to the previous screen only after the modal is closed
    }
  }, [modalVisible, successMessage]); // Trigger navigation when modal is hidden and success message is set

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
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.inputField}
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
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
    backgroundColor: '#D1C4E9'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure transparency to see the background image
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
    color: '#374151'
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

export default ResetPassword;
