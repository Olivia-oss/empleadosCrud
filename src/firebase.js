// Import the functions you need from the SDKs you need
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1wugZyf5Engx7s9Z2VpduGM2KpRuI7JQ",
  authDomain: "carrito-9e334.firebaseapp.com",
  projectId: "carrito-9e334",
  storageBucket: "carrito-9e334.appspot.com",
  messagingSenderId: "420164951199",
  appId: "1:420164951199:web:68ad68d0c4b866d1d4d6aa"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app.database().ref();