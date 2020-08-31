import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2WyzYS2Wm0mUM89MoWzI9GFKSRJ9ImsE",
    authDomain: "react-todo-7bfbc.firebaseapp.com",
    databaseURL: "https://react-todo-7bfbc.firebaseio.com",
    projectId: "react-todo-7bfbc",
    storageBucket: "react-todo-7bfbc.appspot.com",
    messagingSenderId: "413629280977",
    appId: "1:413629280977:web:7eea93b9eb9cd115424bf0"
});

const db = firebaseApp.firestore();

export default db;