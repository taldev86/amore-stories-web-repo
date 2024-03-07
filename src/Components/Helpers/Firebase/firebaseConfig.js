import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEyRyBiEuaieXt95iTPrJSiyrOSdsG8bA",
  authDomain: "amore-stories.firebaseapp.com",
  databaseURL: "https://amore-stories-default-rtdb.firebaseio.com",
  projectId: "amore-stories",
  storageBucket: "amore-stories.appspot.com",
  messagingSenderId: "637701070337",
  appId: "1:637701070337:web:69f278eb53a11f4a9b2a00",
  measurementId: "G-4BG4VGZLJG"
  // apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  // authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  // databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  // projectId: process.env.REACT_APP_FIREBASE_projectId,
  // storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  // appId: process.env.REACT_APP_FIREBASE_appId,
};// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
