import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIbkbxWaVaOIn25kznfn48C2Z1cH2c2Ws",
  authDomain: "user-9a35c.firebaseapp.com",
  projectId: "user-9a35c",
  storageBucket: "user-9a35c.appspot.com",
  messagingSenderId: "754570672043",
  appId: "1:754570672043:web:8364bd746b7e99332944ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
