import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { router } from 'expo-router';
// Firebase imports
import { auth } from './firebaseConfig'; // Make sure the correct path is used for firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      if (isLogin) {
        // Login user
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in!");
        router.push('/Discover'); // Navigate to Discover screen on successful login
      } else {
        // Sign up logic can be added here if needed
        console.log("Sign up functionality not yet implemented.");
      }
    } catch (error) {
      console.error(error.message);

      // Map Firebase error codes to custom error messages
      let message = "An error occurred. Please try again.";
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Please enter a valid email address.";
          break;
        case 'auth/user-not-found':
          message = "No account found with this email. Please check and try again.";
          break;
        case 'auth/wrong-password':
          message = "Incorrect password. Please try again.";
          break;
        case 'auth/too-many-requests':
          message = "Too many failed attempts. Please try again later.";
          break;
        case 'auth/missing-email':
          message = "Email is required.";
          break;
        case 'auth/operation-not-allowed':
          message = "This operation is not allowed. Please contact support.";
          break;
        default:
          message = "Something went wrong. Please try again later.";
          break;
      }

      setErrorMessage(message); // Set the mapped error message
      setModalVisible(true); // Show modal on error
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Image 
                source={require('../../assets/images/backArrow.png')} 
                style={styles.backArrow} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input}
              value={email}
              placeholder="Enter Email"
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input}
              secureTextEntry
              value={password}
              placeholder="Enter Password"
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => router.push("/ResetPassword")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.authButton, loading && { opacity: 0.6 }]} 
              onPress={handleAuth} 
              disabled={loading}
            >
              <Text style={styles.authButtonText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for error messages */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{errorMessage}</Text>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
    backgroundColor: 'transparent',
  },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'flex-start', padding: 10 },
  backButton: {
    backgroundColor: '#FFDAB9',
    padding: 4, 
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginLeft: 16,
  },
  backArrow: {
    width: 20, 
    height: 20, 
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: { flex: 1 },
  label: { color: '#4B5563', marginLeft: 16, marginBottom: 4 },
  input: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    borderRadius: 16,
    marginBottom: 12,
  },
  forgotPasswordButton: { alignItems: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: '#4B5563' },
  authButton: {
    paddingVertical: 6, 
    paddingHorizontal: 16,
    backgroundColor: '#FFDAB9',
    borderRadius: 16,
  },
  authButtonText: {
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#4B5563',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'black',
    marginBottom: 12,
    textAlign: 'center',
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
  toggleText: { textAlign: 'center', color: '#4B5563', marginTop: 12 },
});

export default Page;
