import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ColorBlock from '../../components/ColorBlock.jsx'


export default function index() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#D1C4E9' }]}>
      <View style={styles.mainContainer}>
        <ColorBlock height={60} />
        <Text style={styles.titleText}>Let's Get Started!</Text>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/main-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push('(auth)/CreateProfile')} 
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            {/* /*HAELTYN EDITED THIS U NEED TO EDIT IT BACK BEFORE PUSH */ }
            <TouchableOpacity onPress={() => router.push('(auth)/Page')}> 
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center', // Centers everything closer together vertically
      alignItems: 'center', // Optional: ensures everything is horizontally centered
      marginVertical: 16,
    },
    titleText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 32, 
      textAlign: 'center',
      marginBottom: 16, // Adds spacing between the title and the logo
    },
    logoContainer: {
      alignItems: 'center', 
      marginBottom: 32, // Adds spacing between the logo and the buttons
    },
    logo: {
      width: 600, // Reduce size for better alignment
      height: 400, // Maintain aspect ratio
    },
    buttonContainer: {
      marginVertical: 16,
      width: '100%', // Ensures buttons are aligned consistently
      paddingHorizontal: 20, // Optional for padding around buttons
    },
    signUpButton: {
      paddingVertical: 12,
      backgroundColor: '#FFDAB9',
      marginHorizontal: 28,
      borderRadius: 10,
      marginBottom: 16, // Space between Sign Up and Log In
    },
    signUpButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#374151',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    loginText: {
      color: 'white',
      fontWeight: '600',
    },
    loginButtonText: {
      fontWeight: '600',
      color: '#374151',
      marginLeft: 4,
    },
  });
  

