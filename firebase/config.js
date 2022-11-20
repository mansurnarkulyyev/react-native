import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJ79R71Xr8DKwI-Nl7M7WxvR-QSTV4bsw",
  authDomain: "react-native-mobile-app-9657d.firebaseapp.com",
  projectId: "react-native-mobile-app-9657d",
  storageBucket: "react-native-mobile-app-9657d.appspot.com",
  messagingSenderId: "257613758989",
  appId: "1:257613758989:web:57458582ce8e7eaf840b44",
  measurementId: "G-BJ05HHB900"
};

firebase.initializeApp(firebaseConfig);
export default firebase;