import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import ColorBlock from '../../components/ColorBlock.jsx'

const Page = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const handleAuth = async () => {
    
    setLoading(true);
    console.log("logged in!");
    /*
    if (!email || !password) {
      Alert.alert('Input Error', 'Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
          router.replace('(main)/Index');  // Navigate to the main screen
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential) {
          router.replace('/CreateProfile');  // Navigate to profile creation screen
        }
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }*/
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#D1C4E9' }]}>
      <ColorBlock height={60} />
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
          <TouchableOpacity 
            style={[styles.authButton, loading && { opacity: 0.6 }]} 
            onPress={handleAuth} 
            disabled={loading}
          >
            <Text style={styles.authButtonText}>
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? 'New here? Sign up' : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'flex-start', padding: 10 },
  backButton: {
    backgroundColor: '#FFDAB9', padding: 8, borderTopRightRadius: 16,
    borderBottomLeftRadius: 16, marginLeft: 16,
  },
  formContainer: {
    flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingTop: 32,
    borderTopLeftRadius: 50, borderTopRightRadius: 50,
  },
  form: { flex: 1 },
  label: { color: '#4B5563', marginLeft: 16, marginBottom: 4 },
  input: { padding: 12, backgroundColor: '#F3F4F6', color: '#4B5563', borderRadius: 16, marginBottom: 12 },
  forgotPasswordButton: { alignItems: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: '#4B5563' },
  authButton: {
    paddingVertical: 12, backgroundColor: '#FFDAB9', borderRadius: 16,
  },
  authButtonText: {
    fontSize: 18, fontWeight: 'bold', color: '#4B5563', textAlign: 'center',
  },
  toggleText: { textAlign: 'center', color: '#4B5563', marginTop: 12 },
});

export default Page;
