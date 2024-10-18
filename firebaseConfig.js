import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBYQBfMd9yjctke94ugxyJuE1cWqfMvaIM",
  authDomain: "bravori-evaluation.firebaseapp.com",
  projectId: "bravori-evaluation",
  storageBucket: "bravori-evaluation.appspot.com",
  messagingSenderId: "453463510839",
  appId: "1:453463510839:web:d42e5b21fab4a51e2dd4b2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Initialize Firebase Storage
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
