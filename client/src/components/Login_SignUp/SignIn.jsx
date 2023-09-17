import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import login from "../../assets/login.svg";
import { FaUserCircle } from "react-icons/fa";
import baseURL from "./baseUrl";
const inputCss = "w-[18rem] border px-1 py-2 outline-blue-400 rounded-sm";

const SignIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setUserDetails((userDetails) => {
      return {
        ...userDetails,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userDetails.email && !userDetails.password) {
      window.alert(`Plz fill required fileds...`);
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/login`, userDetails, {
        credentials: "include",
        withCredentials: true,
      });
      if (res.status === 200) {
        window.alert(`Login successfully`);
        setUserDetails((userDetails) => {
          return {
            ...userDetails,
            email: "",
            password: "",
          };
        });
        navigate("/");
      }
    } catch (err) {
      window.alert(`Invalid Credentials... Plz try again`);
      setUserDetails((userDetails) => {
        return {
          ...userDetails,
          email: "",
          password: "",
        };
      });
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full flex items-center justify-center md:h-screen">
        <div className=" hidden md:flex items-center justify-center w-[50%] h-full">
          <img src={login} alt="signIn_img" className="w-[80%]" />
        </div>
        <div className="w-[98%] flex items-center justify-center md:w-[50%] py-5 h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col p-4 gap-5 rounded-xl shadow-xl border"
            autoComplete="off"
            method="POST"
          >
            <div className="w-full flex items-center justify-center">
              <FaUserCircle className="text-6xl text-gray-500" />
            </div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className={inputCss}
              value={userDetails.email}
              onChange={inputEvent}
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={inputCss}
              value={userDetails.password}
              onChange={inputEvent}
              autoComplete="off"
            />
            <button
              className="py-2 bg-blue-400 text-white text-lg hover:bg-blue-500 hover:cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Log In
            </button>
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/signup"
                className="text-base text-gray-600 hover:underline hover:text-blue-500"
              >
                signup
              </Link>
              <span>|</span>
              <Link
                to="/forgotPassword"
                className="text-base text-gray-600 hover:underline hover:text-blue-500"
              >
                forgot-password
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
