import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { VAIPID_KEY } from "../constants/firebaseCollection";

const firebaseConfig = {
  apiKey: "AIzaSyDaXYPmyl86Pttlc6z6jBjoir2ejsPAx2g",
  authDomain: "sj-clothing-app-e38ad.firebaseapp.com",
  projectId: "sj-clothing-app-e38ad",
  storageBucket: "sj-clothing-app-e38ad.appspot.com",
  messagingSenderId: "529299213781",
  appId: "1:529299213781:web:038dc9c1795f0b5361c15c",
  measurementId: "G-5643DV97N4",
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
