// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs-m4iVUXELaz_RrJat58ZDkCxYWeF3vY",
  authDomain: "authentication-ccc44.firebaseapp.com",
  projectId: "authentication-ccc44",
  storageBucket: "authentication-ccc44.appspot.com",
  messagingSenderId: "416650133602",
  appId: "1:416650133602:web:30f67160a5cc664d40d13b",
  measurementId: "G-KNV18DMYJR"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
 
//firestore

const firestore =getFirestore(app);

//const users = doc(firestore, 'collection');
//function details(){
  //const docData ={
   // username:'',
   // password:'',
    //email:'' ,

  //};
 // setDoc(users,docData, {merge: true});
//}
//import { collection, addDoc } from "firebase/firestore"; 

  //try {
  //const docRef = await addDoc(collection(db, "users"), {
    //first: "Ada",
   // last: "Lovelace",
    //born: 1815
  //});
  //console.log("Document written with ID: ", docRef.id);
//} catch (e) {
 // console.error("Error adding document: ", e);
//}
 

export{ firestore };