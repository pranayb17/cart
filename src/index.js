import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1tPL8I1fToAOCg4hoQPj489G8C3R8fWg",
  authDomain: "cart-c3195.firebaseapp.com",
  projectId: "cart-c3195",
  storageBucket: "cart-c3195.appspot.com",
  messagingSenderId: "677901007316",
  appId: "1:677901007316:web:c9d23ad1f36ba21e9d7e41"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


