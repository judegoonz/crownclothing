import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRidirect, signInWithPoPup, GoogleAuthProvider } from 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC1VUF2uIggysDQVLoGxiPTnrkMBZ4EJQo",
    authDomain: "crown-clothing-db-8c4a6.firebaseapp.com",
    projectId: "crown-clothing-db-8c4a6",
    storageBucket: "crown-clothing-db-8c4a6.appspot.com",
    messagingSenderId: "566736083920",
    appId: "1:566736083920:web:e78d106d857f022e0fb7d5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPoPup(auth, provider);