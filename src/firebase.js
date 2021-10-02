// Import the functions you need from the SDKs you need
import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5gPJ0ADfec8QF1aC39aMRlaY4gfzN99w",
    authDomain: "crudempleados-29542.firebaseapp.com",
    projectId: "crudempleados-29542",
    storageBucket: "crudempleados-29542.appspot.com",
    messagingSenderId: "57070023107",
    appId: "1:57070023107:web:7f4223ce3607734aaa8d76"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app.database().ref();