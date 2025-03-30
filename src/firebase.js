import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDqb_G82MSMgGXGzIu8v5ISO4VTNucV19Q",
  authDomain: "fifa-champions-b9cc4.firebaseapp.com",
  projectId: "fifa-champions-b9cc4",
  storageBucket: "fifa-champions-b9cc4.firebasestorage.app",
  messagingSenderId: "645417098158",
  appId: "1:645417098158:web:dbc665d8d14d69be9c863f",
  measurementId: "G-HG5P6LS51Q"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);