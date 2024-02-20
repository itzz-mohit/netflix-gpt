// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV5RBdx0Vowq8lX4yW_hfLrJ4ujsKk6qM",
  authDomain: "netflixgpt-92a17.firebaseapp.com",
  projectId: "netflixgpt-92a17",
  storageBucket: "netflixgpt-92a17.appspot.com",
  messagingSenderId: "125823313779",
  appId: "1:125823313779:web:f3d1287735363d059b4706",
  measurementId: "G-3NL9LY8MTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();