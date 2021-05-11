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

export const getValidCoordinates = () => {
  // return firestore.collection("level-1")
  //   .doc("waldo")
  //   .get()
  let docRef = firestore.collection(`"level-1"`).doc("wenda");
  let testCoords;

  docRef.get().then((doc) => {
    let results = doc.data();
    let xRes = results.xCoords;
    let yRes = results.yCoords;
    testCoords = xRes;
    console.log("document data: ", xRes, yRes);
  })

    // .then((doc) => {
    //   let results = doc.data;
    //   console.log("results", results)})
}

export const addTestData = () => {
  return firestore.collection("test-collection")
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: "Test User",
    });
};

export default firebase;