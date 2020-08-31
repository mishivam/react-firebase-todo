import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // goto firebase setting->project setting->Firebase sdk snipet->choose config->Copy from apikey to appId and paste here
});

const db = firebaseApp.firestore();

export default db;
