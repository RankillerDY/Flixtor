// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBrhspVHFRTTn67nrr5gCe0gzRMp6hhCmE",
    authDomain: "login-aeb97.firebaseapp.com",
    projectId: "login-aeb97",
    storageBucket: "login-aeb97.appspot.com",
    messagingSenderId: "933546155805",
    appId: "1:933546155805:web:ef2885aa66248593a7cbf4",
    measurementId: "G-K46NHXHFHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();