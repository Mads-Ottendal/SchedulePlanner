// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOQwYW5NJOW9zZgEGN_CYIGNfI0g0-N1g",
    authDomain: "scheduleplanner-a71f1.firebaseapp.com",
    projectId: "scheduleplanner-a71f1",
    storageBucket: "scheduleplanner-a71f1.appspot.com",
    messagingSenderId: "658622764244",
    appId: "1:658622764244:web:fbd8a75ffe6fcb94831741",
    measurementId: "G-SH26RJHYE8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);