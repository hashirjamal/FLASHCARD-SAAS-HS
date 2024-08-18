// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl334pN7w9S1bCSK_rZm3ZGotVN4fkPxQ",
  authDomain: "flashcards-hs.firebaseapp.com",
  projectId: "flashcards-hs",
  storageBucket: "flashcards-hs.appspot.com",
  messagingSenderId: "812907352671",
  appId: "1:812907352671:web:4f6ecf4564f152287881ea",
  measurementId: "G-DSLZKP3SE2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);