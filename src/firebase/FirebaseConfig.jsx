// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnBTGxmd-5yHAvpPVZtZ7-F_zWYacO8rU",
  authDomain: "quick-bazar-e968a.firebaseapp.com",
  projectId: "quick-bazar-e968a",
  storageBucket: "quick-bazar-e968a.appspot.com",
  messagingSenderId: "610461296586",
  appId: "1:610461296586:web:1d4e5005d69ddf44105133",
  measurementId: "G-GNHXCRWNE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth=getAuth(app)
export{fireDB,auth};
