// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    // can store in an environment variable for extra protection ( search .env.local for vite in google )
  apiKey: "AIzaSyApeNN6qZdX6WoaiGDSXJiQ51CtwpKlmQ4",
  authDomain: "mern-book-store-f448f.firebaseapp.com",
  projectId: "mern-book-store-f448f",
  storageBucket: "mern-book-store-f448f.firebasestorage.app",
  messagingSenderId: "867629270998",
  appId: "1:867629270998:web:13d220c8d940c84afcc677"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;