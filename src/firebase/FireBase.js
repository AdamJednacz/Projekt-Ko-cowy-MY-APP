// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDsuPn8xaydnmWW81O17nX3vSpQHWdTHY",
    authDomain: "aplikacjakoncowa.firebaseapp.com",
    projectId: "aplikacjakoncowa",
    storageBucket: "aplikacjakoncowa.appspot.com",
    messagingSenderId: "997184464322",
    appId: "1:997184464322:web:75f158a18dc4bfea88a25b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
