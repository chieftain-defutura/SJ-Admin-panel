import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { VAIPID_KEY } from "../constants/firebaseCollection";

const firebaseConfig = {
  apiKey: "AIzaSyDJ5SkpxFFasqUruu6E5PMfnm-6P9ueE7Q",
  authDomain: "sj-clothing.firebaseapp.com",
  projectId: "sj-clothing",
  storageBucket: "sj-clothing.appspot.com",
  messagingSenderId: "638073995197",
  appId: "1:638073995197:web:7beb5bb3792613ec951cd4",
  measurementId: "G-MGEFW61FNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const spaceref=ref()
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
        console.log("No registration token available. Request permission to generate one.");
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
