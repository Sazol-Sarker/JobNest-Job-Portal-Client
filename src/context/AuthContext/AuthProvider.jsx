import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from './../../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   methods to use for Firebase user auth

const googleLogin=()=>{
    setLoading(true)
    const provider=new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
}

const registerUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

const loginUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}
// Get the currently signed-in user
useEffect(()=>{
  const unsubscribe=  onAuthStateChanged(auth,(currentUser)=>{
    if(currentUser)
    {
        // when 1st time registered, we will not track user until logging attempt
        const newUser=currentUser.metadata.createdAt===currentUser.metadata.lastLoginAt

        if(!newUser)
        {
            setUser(currentUser)

        }
        else{
            setUser(null)
        }
    }
        console.log('currentUser:=> State captured:->',currentUser);
        setLoading(false)
    })

    return ()=> unsubscribe();
    
},[])

// Logout
const logOutUser=()=>{
    setLoading(true)
    return signOut(auth)
}

// Email verification link send
const verifyEmail=()=>{
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
}
// Password reset link send

  // Auth context data for global use
  const authInfo = {
   
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    loginUser,
    logOutUser,
    verifyEmail,
    googleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
