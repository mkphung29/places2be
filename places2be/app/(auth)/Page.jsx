import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) router.replace('(main)/Index'); 
      } else {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        if (user) router.replace('/CreateProfile'); 
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#D1C4E9' }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}></TouchableOpacity>
        </View>
        <View>
          {/* Insert picture here */}
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
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  backButton: {
    backgroundColor: '#FFDAB9',
    padding: 8,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginLeft: 16,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    flex: 1,
  },
  label: {
    color: '#4B5563', // gray-700
    marginLeft: 16,
    marginBottom: 4,
  },
  input: {
    padding: 12,
    backgroundColor: '#F3F4F6', // gray-100
    color: '#4B5563', // gray-700
    borderRadius: 16,
    marginBottom: 12,
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4B5563', // gray-700
  },
  authButton: {
    paddingVertical: 12,
    backgroundColor: '#FFDAB9', // yellow-400
    borderRadius: 16,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563', // gray-700
    textAlign: 'center',
  },
});

export default Page;
