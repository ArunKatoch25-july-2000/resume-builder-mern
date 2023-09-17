import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import signup from "../../assets/signup.svg";
import { FaUserCircle } from "react-icons/fa";
import baseURL from "./baseUrl";
const inputCss = "w-[18rem] border px-1 py-2 outline-blue-400 rounded-sm";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setUserDetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const registerUserEvent = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      window.alert(`password and confirm password doesn't match`);
      return;
    } else if (
      !userDetails.email &&
      !userDetails.password &&
      !userDetails.confirmPassword
    ) {
      window.alert(`Plz fill all the required fields`);
      return;
    }
    const res = await axios.post(`${baseURL}/signup`, {
      email: userDetails.email,
      password: userDetails.password,
    });
    const msg = await res.data.msg;
    if (msg === "Email already exists") {
      window.alert(`Email already Exist`);
    } else if (msg === "user registered successfully...") {
      window.alert("user registered successfully...");
      navigate("/login");
    } else {
      window.alert(`Some error occured...`);
    }
  };
  return (
    <>
      <Navbar />
      <section className="w-full flex items-center justify-center md:h-screen">
        <div className=" hidden md:flex items-center justify-center w-[50%] h-full">
          <img src={signup} alt="signup_img" className="w-[80%]" />
        </div>
        <div className="w-[98%] flex items-center justify-center md:w-[50%] py-5 h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            method="POST"
            className="flex flex-col p-4 gap-5 rounded-xl shadow-xl border"
            autoComplete="off"
          >
            <div className="w-full flex items-center justify-center">
              <FaUserCircle className="text-6xl text-gray-500" />
            </div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className={inputCss}
              autoComplete="off"
              value={userDetails.email}
              onChange={inputEvent}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={inputCss}
              autoComplete="off"
              value={userDetails.password}
              onChange={inputEvent}
            />
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm your Password"
              className={inputCss}
              autoComplete="off"
              value={userDetails.confirmPassword}
              onChange={inputEvent}
            />
            <button
              className="py-2 bg-blue-400 text-white text-lg hover:bg-blue-500"
              type="submit"
              onClick={registerUserEvent}
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/login"
                className="text-base text-gray-600 hover:underline hover:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
