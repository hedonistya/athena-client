import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import 'firebase/auth';
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const config = {
  apiKey: "AIzaSyBtMdaj7eeWaSkRva3dAFomxlAZErUuF-8",
  authDomain: "athena-15a80.firebaseapp.com",
  projectId: "athena-15a80",
  storageBucket: "athena-15a80.appspot.com",
  messagingSenderId: "745252724299",
  appId: "1:745252724299:web:66d73b1b3eeca257ff77ce"
};

// Initialize Firebase
const app = initializeApp(config);
const firebase = getFirestore(app);
const firebaseGetAuth = getAuth();
const storage = getStorage(app);

export {firebase, firebaseGetAuth, storage};