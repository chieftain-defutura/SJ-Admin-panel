import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL8AprzFfkfxOon04SJFM2PSmBymzQKuw",
  authDomain: "sj-clothing-firebase.firebaseapp.com",
  projectId: "sj-clothing-firebase",
  storageBucket: "sj-clothing-firebase.appspot.com",
  messagingSenderId: "50849934839",
  appId: "1:50849934839:web:ea19782d8a60dad5bb12f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
