import React, { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const GoogleSignIn = () => {
  // Context data
  const { setUser, googleLogin } =
    useContext(AuthContext);
  // hooks
  const navigate = useNavigate();

  // Google sign In
  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // console.log("G+ => credential", credential);
        // console.log("token", token);
        // console.log("user", user);
        // set user -> login success toast
        setUser(user);
        //success toast
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
          title: `Google sign in for ${user.email} successfull!`,
        });

        // redirect to profile
        navigate("/profile");
      })
      .catch((error) => {
        console.log("ERROR=>", error.code, error.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-5/6 border-1 p-6 mx-5 border-teal-500 text-lg bg-white"
      >
        <FcGoogle className="text-xl" />
        Sign up with Google
      </button>

      <div className="divider text-md w-4/5 mx-auto my-4">Or continue with</div>
    </div>
  );
};

export default GoogleSignIn;
