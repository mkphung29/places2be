import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#A8E6CF' }]}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>
          Let's Get Started!
        </Text>
        <View>
          {/* Insert Logo here */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity>
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
    fontSize: 32, // equivalent to Tailwind's text-4xl
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 16,
  },
  signUpButton: {
    paddingVertical: 12,
    backgroundColor: '#FFDAB9', // yellow-400 #F8C1BF
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

