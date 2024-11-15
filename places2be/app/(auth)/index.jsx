import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function index() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#D1C4E9' }]}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Let's Get Started!</Text>
        <View>
          {/* Insert Logo here */}
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
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32, 
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 16,
  },
  signUpButton: {
    paddingVertical: 12,
    backgroundColor: '#FFDAB9', // 
    marginHorizontal: 28,
    borderRadius: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#374151', // gray-700
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
  },
  loginButtonText: {
    fontWeight: '600',
    color: '#374151', // yellow-400
    marginLeft: 4,
  },
});

