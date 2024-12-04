
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
//import { auth } from '../../FirebaseConfig';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import ColorBlock from '../../components/ColorBlock.jsx';

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    console.log("logged in!");
    router.push('/Discover');
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
    backgroundColor: 'transparent', // Ensures the background image is visible
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
  toggleText: { textAlign: 'center', color: '#4B5563', marginTop: 12 },
});

export default Page;
