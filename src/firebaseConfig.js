import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDW_LaWbxfcYThhmkkppdHuaLyeouB5gQw",
  authDomain: "mis-restaurantes-app.firebaseapp.com",
  projectId: "mis-restaurantes-app",
  storageBucket: "mis-restaurantes-app.firebasestorage.app",
  messagingSenderId: "965038605410",
  appId: "1:965038605410:web:3d54dd8435805f53dd3d3b"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };