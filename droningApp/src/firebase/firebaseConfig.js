// firebaseConfig.js
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCqRo256r52fzGbJz05t14nWZZgR3cRQCI",
  authDomain: "rnfirebaseauthfms.firebaseapp.com",
  projectId: "rnfirebaseauthfms",
  storageBucket: "rnfirebaseauthfms.appspot.com",
  messagingSenderId: "129885057989",
  appId: "1:129885057989:web:055d2e207df3d3da87d1ac",
  measurementId: "G-V6JYTEMBMT"
};

// Verifica si Firebase ya está inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa Firestore
const firestore = getFirestore(app);

// Inicializa Firebase Auth con persistencia usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firestore, auth };
