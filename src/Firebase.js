import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyA_G4NmHIIyWXIi5YUQJVY2TOJMcCiVtmE",
//   authDomain: "canteen-cd9ae.firebaseapp.com",
//   projectId: "canteen-cd9ae",
//   storageBucket: "canteen-cd9ae.firebasestorage.app",
//   messagingSenderId: "377486725012",
//   appId: "1:377486725012:web:bd2e8ef397891e51374981",
//   measurementId: "G-HN4Q6307YE"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCYgzH9U6H0_9BaKKli0EDaxJPYCbWtZL8",
  authDomain: "canteen-9de10.firebaseapp.com",
  projectId: "canteen-9de10",
  storageBucket: "canteen-9de10.firebasestorage.app",
  messagingSenderId: "511824670621",
  appId: "1:511824670621:web:48c403560f6690fd114974",
  measurementId: "G-XB55RSKZLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 let  auth =getAuth(app)
 const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
// export const db = getFirestore(app);
export { auth, provider, signInWithPopup,db };

// Import the functions you need from the SDKs you need
