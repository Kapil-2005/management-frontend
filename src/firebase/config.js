import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBzvtNVTczPlN2IObPtXXIhz2Q5Ut2sUxA",
    authDomain: "health-fitness-8bee0.firebaseapp.com",
    projectId: "health-fitness-8bee0",
    storageBucket: "health-fitness-8bee0.firebasestorage.app",
    messagingSenderId: "619855946067",
    appId: "1:619855946067:web:6701492130b08f5d2101a6",
    measurementId: "G-PT9DYRDCNY"
};

console.log("Initializing Firebase with project:", firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
