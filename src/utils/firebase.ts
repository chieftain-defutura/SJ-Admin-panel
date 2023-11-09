import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { VAIPID_KEY } from "../constants/firebaseCollection";

const firebaseConfig = {
  apiKey: "AIzaSyDlhdIYmsRbAeM4dUNzAt_kcg1ZlTKFZmk",
  authDomain: "sj-clothing-app-new.firebaseapp.com",
  projectId: "sj-clothing-app-new",
  storageBucket: "sj-clothing-app-new.appspot.com",
  messagingSenderId: "20455443046",
  appId: "1:20455443046:web:a2a67cd5c2eba8fb4abba7",
  measurementId: "G-XY2JWWT6NN",
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
