import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
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
        if (user) router.replace('/'); 
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && <ActivityIndicator size='large' color='#0000ff' />}

      <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Your Account'}</Text>

      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize='none'
        placeholder='Password'
        style={styles.inputField}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleAuth} style={styles.btnPrimary}>
        <Text style={styles.btnPrimaryText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    marginVertical: 4,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Page;
