import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA66MpELa8GetMc7u7QLLIKcPvgu1ekgac",
    authDomain: "schooltattoo-f2f88.firebaseapp.com",
    projectId: "schooltattoo-f2f88",
    storageBucket: "schooltattoo-f2f88.appspot.com",
    messagingSenderId: "1035054885570",
    appId: "1:1035054885570:web:a12522bdcdf3fbfc60695b",
    measurementId: "G-40EVBVCJJB"
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
export {db, storage, auth, logInWithEmailAndPassword, logout}