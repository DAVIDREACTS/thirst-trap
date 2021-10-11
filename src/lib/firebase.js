import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

//import seed file
//import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyBR5qFaVW2BapZEqu1f35CYvEXksvUc8U4",
  authDomain: "thirst-3837b.firebaseapp.com",
  projectId: "thirst-3837b",
  storageBucket: "thirst-3837b.appspot.com",
  messagingSenderId: "960339078747",
  appId: "1:960339078747:web:1a4ebe188328bb6ce9597e"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//call seed file ONCE
//seedDatabase(firebase);

export { firebase, FieldValue };