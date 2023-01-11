import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);


export const db = getFirestore(); 

export const addCollectionAndDocuments = async (
  collectionKey, 
  objectsToAdd
  ) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}


export const createUserDocAuth = async (userAuth, additionalInformation ={} ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

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
  
 return await createUserWithEmailAndPassword (auth, email, password);

};

export const signInAuthUserWithEmailAndPassword  = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);

};

export const signOutUser = async () => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);