import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "./../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

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
  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log();
        // when 1st time registered, we will not track user until logging attempt
        const newUser = currentUser.emailVerified;

        if (newUser) {
          setUser(currentUser);
        } else {
          setUser(null);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Verify your email first.",
          });
        }
      }
      // console.log("currentUser:=> State captured:->", currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Logout
  const logOutUser = () => {
    setLoading(true);
    setUser(null);
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
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
