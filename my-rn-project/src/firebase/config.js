import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBMbhqCwNKztEarou1ZpuaiT6MegXs1lys",
  authDomain: "proyecto-integra-dadff.firebaseapp.com",
  projectId: "proyecto-integra-dadff",
  storageBucket: "proyecto-integra-dadff.firebasestorage.app",
  messagingSenderId: "405216162619",
  appId: "1:405216162619:web:bfb444af74b36cabad7d1e"
};

app.initializeApp(firebaseConfig);

export const auth = firebase. auth();
export const storage = app.storage();
export const db = app. firestore();