import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { VAIPID_KEY } from "../constants/firebaseCollection";

const firebaseConfig = {
  apiKey: "AIzaSyDdFp04xNN0muNQRmbmAHlzsGEYeZEp5ls",
  authDomain: "sj-clothing-app.firebaseapp.com",
  projectId: "sj-clothing-app",
  storageBucket: "sj-clothing-app.appspot.com",
  messagingSenderId: "108999029592",
  appId: "1:108999029592:web:0c0d0ac0d8973cc12a2b2d",
  measurementId: "G-N9M82Z3P8Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: VAIPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
