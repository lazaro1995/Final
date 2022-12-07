import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDZFFOBHaG47Dmty0mIuoOtVxI-FvC6sFE",
    authDomain: "ecommerce-with-react-5c89c.firebaseapp.com",
    projectId: "ecommerce-with-react-5c89c",
    storageBucket: "ecommerce-with-react-5c89c.appspot.com",
    messagingSenderId: "467419175038",
    appId: "1:467419175038:web:199a0c4761a2e0d8f3a02f"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }