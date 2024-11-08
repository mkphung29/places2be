import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, firestore } from '../../FirebaseConfig'; 

const CreateProfile = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // Add your logic to save the profile to the database
    try {
      const user = FIREBASE_AUTH.currentUser;

      if (user) {
        await firestore.collection('users').doc(user.uid).set({
          userName,
          password
        });

        Alert.alert('Profile Created', 'Your profile has been created successfully!');
      } else {
        Alert.alert('Error', 'User not authenticated. Please log in.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#D1C4E9' }]}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TextInput
        placeholder="email address"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="username"
        value={userName}
        onChangeText={setUserName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
      />
      <TextInput
        placeholder="confirm password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
});

export default CreateProfile;
