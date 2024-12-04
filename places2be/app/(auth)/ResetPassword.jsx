import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { router } from 'expo-router'; 

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log("submitted");
    router.back();
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

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
        </ScrollView>
      </SafeAreaView>
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
});

export default ResetPassword;
