import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrv6-iiAtNt7mi5O_cJaYANcfr42bx8yI",
  authDomain: "vibestream-auth.firebaseapp.com",
  projectId: "vibestream-auth",
  storageBucket: "vibestream-auth.appspot.com",
  messagingSenderId: "640206556246",
  appId: "1:640206556246:web:827df0a75970930d84fff7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signUpWithEmailAndPassword = async (email, password, name, profilePicture) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const storageRef = ref(storage, `images/${user.uid}.jpg`);
    uploadBytes(storageRef, profilePicture).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        updateProfile(user, {
          displayName: name,
          photoURL: url,
        });
      });
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { app, auth, db, storage, signInWithGoogle, signInWithGithub, logout, signUpWithEmailAndPassword };