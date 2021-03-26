import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBLRy_BONhxC3gHK1cwy5-Kat0UE0mbj_s",
  authDomain: "shopstp-112.firebaseapp.com",
  databaseURL: "https://shopstp-112.firebaseio.com",
  projectId: "shopstp-112",
  storageBucket: "shopstp-112.appspot.com",
  messagingSenderId: "21499581671",
  appId: "1:21499581671:web:a62093e9f73288579cbe42",
  measurementId: "G-RX00V42EX3"
};

let fireApp, adminApp;

if (!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(firebaseConfig);
  adminApp = firebase.initializeApp(firebaseConfig, "fireAdmin");
} else {
  fireApp = firebase.app();
  adminApp = firebase.app("fireAdmin");
}

export { fireApp, adminApp };
