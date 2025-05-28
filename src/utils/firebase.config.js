// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export default auth;
// ---------------------Avobe code is from programming hero--------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_4JIfKk6tiyZFlTurM_RrGzFmKiRQhLc",
  authDomain: "redux-thunk-taskmaster.firebaseapp.com",
  projectId: "redux-thunk-taskmaster",
  storageBucket: "redux-thunk-taskmaster.firebasestorage.app",
  messagingSenderId: "328067125097",
  appId: "1:328067125097:web:b568fdbedcafa9662f77f8",
  measurementId: "G-3DE4KKR22N"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
