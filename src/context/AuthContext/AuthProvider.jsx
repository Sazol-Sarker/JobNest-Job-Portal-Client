import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from './../../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   methods to use for Firebase user auth
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
        setUser(currentUser)
        console.log('currentUser:=> State captured:->',currentUser);
        setLoading(false)
    })

    return ()=>{
        unsubscribe();
    }
},[])

  // Auth context data for global use
  const authInfo = {
    name: "MR Bindia",
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    loginUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
