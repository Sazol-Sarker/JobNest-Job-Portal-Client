import React, { useContext,useRef } from "react";
import loginAnimation from "../../assets/lottie/loginAnimation.json";
import Lottie from "lottie-react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import PasswordResetModal from "../../components/PasswordResetModal";
const Login = () => {
  // context data
  const { loginUser,setUser,setLoading } = useContext(AuthContext);
  // hooks
  const navigate = useNavigate();
  // ref hooks for forgot pass modal
  const modalRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    

    // Firebase SDK to auth user login
    loginUser(email, password)
      .then((result) => {
        
        if (!result.user.emailVerified) {
          setUser(result.user)
          // toast
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
          return
        } 
        
        // console.log("LOG IN SUCCESS-> user=>", result.user);
        setLoading(false);

          // reset the form
          form.reset();
          // toast
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
            title: "Logged in successfully",
          });
          // redirects to profile after login
          navigate("/profile");

        })
        .catch((error) => {
          Swal.fire('warning', `${error.code}`, `${error.message}`);

          // console.log("ERROR=>", error.code, error.message);
        });
      
  };
  return (
    <div className="hero bg-base-200 my-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-80 ml-10">
          <Lottie animationData={loginAnimation} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-2xl font-bold text-center">Login now!</h1>
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
                <Link onClick={() => modalRef.current.showModal()} to=""
                  className="label-text-alt link link-hover text-teal-500 font-bold"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <PasswordResetModal modalRef={modalRef}></PasswordResetModal>
        </div>
      </div>
    </div>
  );
};

export default Login;
