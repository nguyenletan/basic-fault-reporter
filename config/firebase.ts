import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  browserLocalPersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase project configuration
// Get these values from Firebase Console > Project Settings > General
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCRcYIb-XSar4mQ2t1OvOeAIa1l5XtyU1c',
  authDomain: 'beeenergy-2e966.firebaseapp.com',
  projectId: 'beeenergy-2e966',
  storageBucket: 'beeenergy-2e966.firebasestorage.app',
  messagingSenderId: '483043061216',
  appId: '1:483043061216:web:0715df11a27d409d094f85',
  measurementId: 'G-0K6TQV98XB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with platform-specific persistence
export const auth =
  Platform.OS === 'web'
    ? (() => {
        const auth = getAuth(app);
        auth.setPersistence(browserLocalPersistence);
        return auth;
      })()
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
