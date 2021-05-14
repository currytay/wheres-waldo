import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCf9Rd6ZKHYYBFUVi5a2vucY3WUL1NtpNQ",
  authDomain: "where-s-waldo-d1566.firebaseapp.com",
  projectId: "where-s-waldo-d1566",
  storageBucket: "where-s-waldo-d1566.appspot.com",
  messagingSenderId: "438066519082",
  appId: "1:438066519082:web:18fb72dde0a675f0af3753"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;