// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth, onAuthStateChanged } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvqg76VW13sGa37OKGhl95ycrBxo5oSa0",
  authDomain: "marketing-8d882.firebaseapp.com",
  projectId: "marketing-8d882",
  storageBucket: "marketing-8d882.appspot.com",
  messagingSenderId: "522843713755",
  appId: "1:522843713755:web:80ed841c2ec55d12a29cfe",
  measurementId: "G-S3EC2C94M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app); // Initialize analytics only in client-side
}

export { app, auth, analytics };

onAuthStateChanged(auth, user => {
  if (user !== null){
 console.log('logged in!');
  } else {
    console.log('No user');
  }
});