import React, { useContext, useState } from "react";
import registerAnimation from "../../assets/lottie/registerAnimation.json";
import Lottie from "lottie-react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import GoogleSignIn from "../../components/GoogleSignIn";

const Register = () => {
  // Context data
  const { registerUser, verifyEmail } = useContext(AuthContext);
  // hooks
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // Email register
  const handleRegister = (e) => {
    // stopping page reload
    e.preventDefault();

    if (!isChecked) {
      toast("Please agree to the terms & conditions");
      return;
    }

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      const errors = [];
      if (password.length < 6)
        errors.push("Password length must be 6 or more.");
      if (!/[a-z]/.test(password))
        errors.push("Password must contain at least 1 lowercase letter.");
      if (!/[A-Z]/.test(password))
        errors.push("Password must contain at least 1 uppercase letter.");
      if (!/\d/.test(password))
        errors.push("Password must contain at least 1 digit.");
      if (!/[\W_]/.test(password))
        errors.push("Password must contain at least 1 special character.");
      // console.log("errors=>", errors);

      // Error logging toast alert
      errors.forEach((error, idx) => {
        setTimeout(() => {
          toast(`${error}`);
        }, idx * 1000);
      });

      return;
    }

    // Firebase SDK to create user
    registerUser(email, password)
      .then((result) => {
        const { metadata } = result.user;
        // newUser goes to mongodb
        const newUser = {
          name: name || "Unknown", 
          email: email,
          creationTime: metadata.creationTime,
          lastSignInTime: metadata.lastSignInTime,
        };
        console.log("USER=>", result.user);
        console.log("USER=>", newUser);


        // POST API: usersCollection
        fetch('http://localhost:5000/users',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(newUser)
          })
          .then(res=>res.json())
          .then(data=>console.log("User creation Response from mongodb=>",data))


        // resetting form
        form.reset();
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
          title: "Registered successfully",
        });

        // verify email
        verifyEmail()
          .then(() => {
            toast(`Email verification link sent to ${email}`);
          })
          .catch((error) => {
            // console.log(
            //   "Email verify link sent Error=>",
            //   error.code,
            //   error.message
            // );

            toast(
              `warning! ${error.code || "Error"} ${
                error.message || "An unexpected error occurred."
              }`
            );
          });

        // redirect
        navigate("/login");
      })
      .catch((error) => {
        toast(
          `warning!  ${error.code || "Error"}  ${
            error.message || "An unexpected error occurred."
          }`
        );
        // console.log("ERROR=>", error.code, error.message);
      });
  };
  return (
    <div className="hero w-11/12 mx-auto bg-base-200 my-10">
      <title>JobNest | Register</title>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-80 ml-10">
          <Lottie animationData={registerAnimation} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="flex flex-col justify-center items-center mt-5 space-y-5">
            <h4 className="text-blue-600">Register</h4>
            <h2 className="text-3xl font-bold text-blue-800">
              Start for free Today
            </h2>
            <p className="text-gray-400">
              Access to all features. No credit card required.
            </p>
            <GoogleSignIn></GoogleSignIn>
          </div>

          <form onSubmit={handleRegister} className="card-body w-full ">
            {/* <h1 className="text-2xl font-bold text-center">Register now!</h1> */}
            <div className="form-control">
              <label className="label  mb-3">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Steven Job"
                className=" w-full border-gray-200 p-3"
                required
              />
            </div>
            <div className="form-control">
              <label className="label  mb-3">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="steven.job@gmail.com"
                className=" w-full border-gray-200 p-3"
                required
              />
            </div>
            <div className="form-control">
              <label className="label  mb-3">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full border-gray-200 p-3"
                required
              />

              <div className="form-control mt-3">
                <label className="label cursor-pointer">
                  <input
                    onClick={() => setIsChecked(!isChecked)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <span className="label-text label-text-alt link link-hover text-teal-500 font-bold">
                    Agree to our terms & conditions
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white text-lg font-light py-5 bg-blue-800 hover:bg-blue-800/80 w-full">
                Submit & Register
              </button>
            </div>
          </form>
          <p className="text-center mb-5">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-teal-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
