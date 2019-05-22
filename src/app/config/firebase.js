// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  // TODO : //hide api
  apiKey: "AIzaSyDz5s2rXtJ1DWMrp0wuZ6Xvl4vSA6jPY2w",
  authDomain: "swaptr1.firebaseapp.com",
  databaseURL: "https://swaptr1.firebaseio.com",
  projectId: "swaptr1",
  storageBucket: "swaptr1.appspot.com",
  messagingSenderId: "352377165907",
  appId: "1:352377165907:web:a1248fb7a6a8616e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
