import { useEffect, useState, createContext } from "react";
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
import axios from "axios";
import app from "../firebase/firebase.config.js";

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setIsLoading(false));
  };

  const signIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setIsLoading(false));
  };

  const googleProvider = new GoogleAuthProvider();

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL })
      .then(() => {
        setUser(prev => ({ ...prev, displayName, photoURL }));
      })
      .catch(err => console.log(err));
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setIsLoading(false));
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth).finally(() => setIsLoading(false));
  };

  const resetPassword = (email) => {
    setIsLoading(true);
    return sendPasswordResetEmail(auth, email)
      .finally(() => setIsLoading(false));
  };

  // Firebase → backend sync to get role
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          const { data } = await axios.post("http://localhost:3000/auth/login", { token });
          setUser({ ...currentUser, role: data.role }); // Attach role from DB
        } catch (err) {
          console.error("Role fetch failed", err);
          setUser(currentUser); // fallback without role
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user, // has user.role
    setUser,
    isLoading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
    logOut,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
