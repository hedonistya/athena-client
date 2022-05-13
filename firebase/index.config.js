import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNAfaHiNj_mVhLKS-D6QpQ7Bp3qMYyc_g",
  authDomain: "athena-101c4.firebaseapp.com",
  projectId: "athena-101c4",
  storageBucket: "athena-101c4.appspot.com",
  messagingSenderId: "739807790283",
  appId: "1:739807790283:web:5c5635ff01093644b1474e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firebase = getFirestore();
const firebaseGetAuth = getAuth();

export {firebase, firebaseGetAuth};