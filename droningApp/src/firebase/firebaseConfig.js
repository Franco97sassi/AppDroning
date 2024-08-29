// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCqRo256r52fzGbJz05t14nWZZgR3cRQCI",
//   authDomain: "rnfirebaseauthfms.firebaseapp.com",
//   projectId: "rnfirebaseauthfms",
//   storageBucket: "rnfirebaseauthfms.appspot.com",
//   messagingSenderId: "129885057989",
//   appId: "1:129885057989:web:055d2e207df3d3da87d1ac",
//   measurementId: "G-V6JYTEMBMT"
// };

// // Verifica si Firebase ya está inicializado
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Inicializa Firebase Auth con persistencia en AsyncStorage
// const auth = getAuth(app);

// // Verifica si Auth ya está inicializado antes de configurarlo
// if (!auth._isInitialized) {
//   initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });
// }

// // Inicializa Firestore
// const firestore = getFirestore(app);

// export { auth, firestore };

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

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

// Inicializa Firebase Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const firestore = getFirestore(app);
// const facebookProvider = new FacebookAuthProvider();
export { auth, firestore };
// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';  // Eliminamos `initializeAuth` y `getReactNativePersistence`
// import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Si lo necesitas para otra funcionalidad

// // Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCqRo256r52fzGbJz05t14nWZZgR3cRQCI",
//   authDomain: "rnfirebaseauthfms.firebaseapp.com",
//   projectId: "rnfirebaseauthfms",
//   storageBucket: "rnfirebaseauthfms.appspot.com",
//   messagingSenderId: "129885057989",
//   appId: "1:129885057989:web:055d2e207df3d3da87d1ac",
//   measurementId: "G-V6JYTEMBMT"
// };

// // Verifica si Firebase ya está inicializado
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Inicializa Firebase Auth (sin `initializeAuth` ni `getReactNativePersistence`)
// const auth = getAuth(app);

// // Inicializa Firestore
// const firestore = getFirestore(app);

// // Exporta las instancias de auth y firestore
// export { auth, firestore };
