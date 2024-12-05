import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdHdRvpPM8PIm6GuphQ7glx1ZqTc3ivAk",
  authDomain: "places2be-c8f11.firebaseapp.com",
  projectId: "places2be-c8f11",
  storageBucket: "places2be-c8f11.firebasestorage.app",
  messagingSenderId: "191723263306",
  appId: "1:191723263306:web:d3ab0f802c51466ffd1db3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage for persistence
});

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

// Export auth and db instances
export { auth, db };
