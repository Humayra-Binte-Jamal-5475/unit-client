import { useEffect, useState } from "react";
import app from "../firebase/firebase.config.js"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { createContext } from "react";
import { getAuth } from "firebase/auth";

const auth= getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

const createUser=(email,password)=>{
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
};
const signIn=(email,password)=>{
    setIsLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
};
   const googleProvider = new GoogleAuthProvider();

   const updateUserProfile = (displayName, photoURL) => {
       return updateProfile(auth.currentUser, { displayName, photoURL})
       .then(() => {
         setUser({...user, displayName, photoURL})
       })
       .catch(err=> {
        console.log(err)
       })
   }

   const signInWithGoogle = () => {
      return signInWithPopup(auth, googleProvider)
   }

   const logOut = () => {
     setIsLoading(false)
   return signOut(auth);
    
   }
   const resetPassword = (email) => {
    setIsLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error; // Pass the error to the calling component
      });
  }

   useEffect(() => {
          const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setIsLoading(false)
          })

          return () => unSubscribe() //cleanup function
   }, [])

   const userInfo = {
    signInWithGoogle,
    user,
    setUser,
    createUser,
    logOut,
    isLoading,
    signIn,
    updateUserProfile,
    resetPassword
   }
    



   return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;