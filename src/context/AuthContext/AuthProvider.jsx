import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "./../../firebase/firebase.init";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   methods to use for Firebase user auth

  const googleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // When website tab closed, auth state resets by session FIREBASE Client SDK Fn: browserSessionPersistence
  useEffect(() => {
    // Set session persistence when the app loads
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // console.log("Session persistence set to 'session'");
      })
      .catch((error) => {
        // console.error("Error setting persistence:", error);
      });

    // // Listen for authentication state changes
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);
    // });

    // return () => unsubscribe();
  }, [auth]);

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log();
        // when 1st time registered, we will not track user until logging attempt
        const verifiedUser = currentUser.emailVerified;

        // console.log("In AUTH STATE=>>", verifiedUser);
        // if email verified
        if (verifiedUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }

        if (currentUser?.email) {
          // console.log("HELLO=>", currentUser?.email);

          // POST API: get jwt token

          const user = { email: currentUser?.email };
          axios
            .post("http://localhost:5000/jwt", user, {
              withCredentials: true,
            })
            .then((res) => {
              setLoading(false);
              // console.log("RESPONSE=>", res.data);
            });
        }
      }
      console.log("currentUser:=> State captured:->", currentUser);
      // setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Logout
  const logOutUser = () => {
    setLoading(true);
    setUser(null);
    // ALAS! user logging out? => unavailable
    // POST API: JWT AUTH
    axios
      .post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        // console.log("LOGOUT=>", res.data);
        setLoading(false);
      });
    return signOut(auth);
  };

  // Email verification link send
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };
  // Password reset link send
  const handlePassResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  // Update user info in auth profile
  const updateAuthProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  // Auth context data for global use
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    isModalOpen,
    setIsModalOpen,
    registerUser,
    loginUser,
    logOutUser,
    verifyEmail,
    googleLogin,
    handlePassResetEmail,
    updateAuthProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
