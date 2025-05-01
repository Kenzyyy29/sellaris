// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0UeBEJ3bUc1CnnEiTrN8b38shJQFuyf4",
    authDomain: "sellaris-cc760.firebaseapp.com",
    projectId: "sellaris-cc760",
    storageBucket: "sellaris-cc760.firebasestorage.app",
    messagingSenderId: "1064572739523",
    appId: "1:1064572739523:web:f8c764685c393fe5a52776"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, db as firestore };