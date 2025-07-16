import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import app from "../firebase/firebase.config.js";

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoad] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // 🔁 Sync firebase user with backend
  const syncWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const { data } = await axios.post("http://localhost:3000/auth/login", { token });

      console.log("✅ /auth/login response:", data);

      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || firebaseUser.email,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        role: data.role,
      });
    } catch (err) {
      console.error("⛔ Role fetch failed:", err);
      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || firebaseUser.email,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        role: "user", // fallback
      });
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await syncWithBackend(fbUser);
      } else {
        setUser(null);
      }
      setLoad(false);
    });
    return unsub;
  }, []);

  // ✅ All auth methods now return results
  const createUser = async (email, password) => {
    setLoad(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await syncWithBackend(result.user);
      return result;
    } finally {
      setLoad(false);
    }
  };

  const signIn = async (email, password) => {
    setLoad(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncWithBackend(result.user);
      return result;
    } finally {
      setLoad(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoad(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
      return result;
    } finally {
      setLoad(false);
    }
  };

  const updateUserProfile = async (displayName, photoURL) => {
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser((prev) => ({ ...prev, displayName, photoURL }));
  };

  const logOut = () => {
    setLoad(true);
    return signOut(auth).finally(() => setLoad(false));
  };

  const resetPassword = (email) => {
    setLoad(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoad(false));
  };

  const value = {
    user,
    isLoading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;




