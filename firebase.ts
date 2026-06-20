import { initializeApp,getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB2s9X3Ay-MJa_jYrf6kucZOS8mQCrf114",
  authDomain: "chull-sheet-150be.firebaseapp.com",
  projectId: "chull-sheet-150be",
  storageBucket: "chull-sheet-150be.firebasestorage.app",
  messagingSenderId: "684389128756",
  appId: "1:684389128756:web:9d1605ca5c3687a67bc861",
  measurementId: "G-S9WR9RPFMC"
};

const app=getApps().length===0?initializeApp(firebaseConfig):getApp();

// const analytics = getAnalytics(app);
const db=getFirestore(app)

export {db}