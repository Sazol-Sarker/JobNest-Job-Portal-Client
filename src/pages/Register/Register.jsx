import React, { useContext } from "react";
import registerAnimation from "../../assets/lottie/registerAnimation.json";
import Lottie from "lottie-react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Register = () => {
  // Context data
  const { registerUser,verifyEmail } = useContext(AuthContext);

  const handleRegister = (e) => {
    // stopping page reload
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      const errors = [];
      if (password.length < 6)
        errors.push("Password length must be 6 or more.");
      if(!/[a-z]/.test(password))
        errors.push("Password must contain at least 1 lowercase letter.");
      if(!/[A-Z]/.test(password))
        errors.push("Password must contain at least 1 uppercase letter.");
      if(!/\d/.test(password))
        errors.push("Password must contain at least 1 digit.");
      if(!/[\W_]/.test(password))
        errors.push("Password must contain at least 1 special character.");
      console.log("errors=>",errors);

      // Error logging toast alert
     errors.forEach((error,idx) => {
      setTimeout(() => {
        toast(`${error}`)
      }, idx*1000);
     });
      
      return
    }

      // Firebase SDK to create user
      registerUser(email, password)
        .then((result) => {
          console.log("USER=>", result.user);
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
          .then(()=>{
            toast(`Email verification link sent to ${email}`)
          })
          .catch(error=>{
            console.log("Email verify link sent Error=>",error.code,error.message);
          })


        })
        .catch((error) => {
          console.log("ERROR=>", error.code, error.message);
        });
     
  };
  return (
    <div className="hero bg-base-200 my-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-80 ml-10">
          <Lottie animationData={registerAnimation} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-2xl font-bold text-center">Register now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label mt-3">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-teal-500 font-bold"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
