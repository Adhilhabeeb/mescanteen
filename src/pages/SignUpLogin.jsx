import React from "react";
import loginCover from "../assets/images/login-cover.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import loginBackground from "../assets/images/landing-cover.png";

function SignUpLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-blue-200">
      {/* <img
        className="absolute inset-0 -z-10 w-full object-cover h-full"
        src={loginBackground}
        alt=""
      /> */}
      {/* <div className="absolute inset-0 bg-black -z-5 opacity-60"></div> */}
      <div className="bg-white grid md:grid-cols-[auto_450px] max-w-[800px] mx-[10%] md:mx-20 shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-red-200">
          <img
            src={loginCover}
            alt="login cover image"
            className="h-full object-cover w-full"
          />
        </div>
        <div className="bg-white px-[10%] md:px-[12%]">
          <div className="flex flex-col items-center my-8 md:py-15">
            <h2 className="text-xl font-bold">Welcome Back</h2>
            <p className="text-xs text-center px-4">
              Enjoy delicious meals and quick service. Order now and satisfy
              your cravings!
            </p>
            <form className="flex flex-col w-full py-5 gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="email">
                    Email or Phone
                  </label>
                  <input
                    className="border text-sm p-1 rounded-xs border-gray-400 focus-visible:outline-blue-500"
                    id="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="">
                    Password
                  </label>
                  <input
                    className="border text-sm p-1 rounded-xs border-gray-400 focus-visible:outline-blue-500"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <p className="ml-auto text-xs text-blue-500 cursor-pointer">
                Forgot your password?
              </p>
              <button
                className="bg-green-500 rounded-xs p-2 text-white font-bold cursor-pointer"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="w-full grid grid-cols-[40%_auto_40%] items-center">
              <hr className="" />
              <span className="text-center text-sm">OR</span>
              <hr />
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-4 w-full justify-center">
              <button className="rounded-xs border border-blue-300 p-2 text-xs flex items-center gap-1 cursor-pointer justify-center">
                <ImFacebook2 className="text-blue-600" />
                Sign in with Facebook
              </button>
              <button className="rounded-xs border border-blue-300 p-2 text-xs flex items-center gap-1 cursor-pointer justify-center">
                <FcGoogle />
                Sign in with Google
              </button>
            </div>
            <p className="text-xs">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpLogin;
