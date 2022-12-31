import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC1VUF2uIggysDQVLoGxiPTnrkMBZ4EJQo",
  authDomain: "crown-clothing-db-8c4a6.firebaseapp.com",
  projectId: "crown-clothing-db-8c4a6",
  storageBucket: "crown-clothing-db-8c4a6.appspot.com",
  messagingSenderId: "566736083920",
  appId: "1:566736083920:web:e78d106d857f022e0fb7d5"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore(); 

export const createUserDocumentFromauth = async (userAuth, additionalInformation ={} ) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
          console.log('error', error.message);
      }
  }

  return userDocRef;
};


export const createAuthUserwithEmailandpassword = async (email, password) => {
  if (!email || !password) return;
  
 return await createUserWithEmailAndPassword,(auth, email, password);

};

export const signInAuthUserWithEmailAndPassword  = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);

};

export const signOutUser = async () => await signOut(auth); 