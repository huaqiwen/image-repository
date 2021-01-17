import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore'; 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBytvHX6bR3WGzdntY1BB1WwdZ90c6rD4o",
    authDomain: "image-repository-b4ec2.firebaseapp.com",
    projectId: "image-repository-b4ec2",
    storageBucket: "image-repository-b4ec2.appspot.com",
    messagingSenderId: "274170137098",
    appId: "1:274170137098:web:a2d39a97cc54a621ffadf3"
};

firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();
const fbFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { fbStorage, fbFirestore, timestamp };
