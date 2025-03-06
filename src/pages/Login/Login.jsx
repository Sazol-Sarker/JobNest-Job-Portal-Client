import React from "react";
import loginAnimation from '../../assets/lottie/loginAnimation.json'
import Lottie from "lottie-react";
const Login = () => {
  return (
    <div className="hero bg-base-200 my-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-80 ml-10">
          <Lottie animationData={loginAnimation} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <h1 className="text-2xl font-bold text-center">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
