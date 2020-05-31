
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC7ufVPL912Aki4Mfw8Pu7oOSHp4DbazJ4",
    authDomain: "vue-shop-4b03c.firebaseapp.com",
    databaseURL: "https://vue-shop-4b03c.firebaseio.com",
    projectId: "vue-shop-4b03c",
    storageBucket: "vue-shop-4b03c.appspot.com",
    messagingSenderId: "611187509425",
    appId: "1:611187509425:web:9a62b18ad94ab0acc17a90",
    measurementId: "G-PFQYXBJFB5"
  };
  // Initialize Firebase
  
   const fb = firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();

   export {fb,db}
  
  //export default const fs = firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  
  