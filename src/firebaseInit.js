import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWAzNi5OA5PGkCKb9SKTNcOQUvc4-UA7M",
  authDomain: "watlink.firebaseapp.com",
  projectId: "watlink",
  storageBucket: "watlink.appspot.com",
  messagingSenderId: "253960352933",
  appId: "1:253960352933:web:9b3d0b8ebdf16326e0494c",
  measurementId: "G-FDT4VFEJ05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };