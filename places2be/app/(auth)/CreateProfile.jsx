import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { router } from 'expo-router'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore();

const CreateProfile = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const sanitizeUserName = (name) => {
    // Remove spaces and special characters
    return name.replace(/[^a-zA-Z0-9]/g, '');
  };

  const checkUsernameUniqueness = async (username) => {
    // Check if the username already exists in Firestore
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);
    return !userSnap.exists();  // Returns true if the username is unique
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setModalVisible(true);
      return;
    }

    const sanitizedUserName = sanitizeUserName(userName);

    // Ensure the username doesn't contain spaces or special characters
    if (sanitizedUserName !== userName) {
      setErrorMessage('Username can only contain letters and numbers, with no spaces or special characters.');
      setModalVisible(true);
      return;
    }

    const isUnique = await checkUsernameUniqueness(sanitizedUserName);
    if (!isUnique) {
      setErrorMessage('Username is already taken.');
      setModalVisible(true);
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store the sanitized username in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: userName,
        email: user.email,
        savedPlaces: [],
        comments: [],
        likedComments: [],
        numberComments: 0,
        numberFriends: 0,
        numberSaves: 0,

      });

      console.log("User created successfully");
      router.push('/Discover'); // Redirect to Discover screen
    } catch (error) {
      setErrorMessage(error.message);
      setModalVisible(true);
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
            <Text style={styles.title}>Create Your Profile</Text>
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.inputField}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Username"
              value={userName}
              onChangeText={setUserName}
              style={styles.inputField}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.inputField}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputField}
              secureTextEntry
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>

      {/* Modal for error messages */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
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
  modalOverlay: {
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
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FFDAB9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#374151',
  }
});

export default CreateProfile;
