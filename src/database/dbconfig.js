// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2jtBIKJNtqLpz-diI-dMX3FDgEcXXafE",
  authDomain: "journeycraft-ai.firebaseapp.com",
  databaseURL: "https://journeycraft-ai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "journeycraft-ai",
  storageBucket: "journeycraft-ai.firebasestorage.app",
  messagingSenderId: "644991036003",
  appId: "1:644991036003:web:f906866034243902546656",
  measurementId: "G-YXV9E1SDL1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);