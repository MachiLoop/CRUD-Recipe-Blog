// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe8IKKazpBqTbwy0fYyhLWrzO22qklXDY",
  authDomain: "recipe-app-9045e.firebaseapp.com",
  projectId: "recipe-app-9045e",
  storageBucket: "recipe-app-9045e.firebasestorage.app",
  messagingSenderId: "375286968590",
  appId: "1:375286968590:web:d761bed2f3323a4a86275f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
