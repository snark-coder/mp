import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';


export const AuthContext = createContext();
const auth = getAuth(app);
const google_provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = ()=>{
      setLoading(true);
      return signInWithPopup(auth, google_provider)
    }

    const login = (email, password) => {
      setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
      return signOut(auth);
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        //console.log(currentUser);
        setUser(currentUser);
        setLoading(false);
      })
      return () => {
        return unsubscribe();
      }
    },[])

    

    const authInfo = {
      user,
        createUser,
        googleLogin,
        loading,
        login,
        logout
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
