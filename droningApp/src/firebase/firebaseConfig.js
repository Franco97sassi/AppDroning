// firebaseConfig.js
import { initializeApp } from 'firebase/app';
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
