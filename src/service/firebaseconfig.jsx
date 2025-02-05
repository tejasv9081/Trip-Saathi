// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCzArg3aQsH__s-PQjpgshIUrnwSA_OfLU",
  authDomain: "trip-saathi.firebaseapp.com",
  projectId: "trip-saathi",
  storageBucket: "trip-saathi.firebasestorage.app",
  messagingSenderId: "617853948838",
  appId: "1:617853948838:web:016f3093e7924a38abb567",
  measurementId: "G-TF2P8S5S8K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);