import { useState } from "react";
import axios from "axios";
import baseURL from "./baseUrl";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import forgot_password from "../../assets/forgot_password.svg";
import { FaUserCircle } from "react-icons/fa";
const inputCss = "w-[18rem] border px-1 py-2 outline-blue-400 rounded-sm";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const inputEvent = (e) => {
    e.preventDefault();
    setUserEmail((userEmail) => e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      window.alert(`Plz fill valid email id`);
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/forgot-password/${userEmail}`);

      const msg = await res.data.msg;
      if (msg === "Valid Email") {
        setShowMsg((showMsg) => true);
      }
    } catch (err) {
      window.alert("Something went wrong plz try later..");
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full flex items-center justify-center md:h-screen">
        <div className=" hidden md:flex items-center justify-center w-[50%] h-full">
          <img
            src={forgot_password}
            alt="forgot_password_img"
            className="w-[80%]"
            loading="lazy"
          />
        </div>
        <div className="w-[98%] flex items-center justify-center md:w-[50%] py-5 h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col p-4 gap-5 rounded-xl shadow-xl border"
            autoComplete="off"
          >
            <div className="w-full flex items-center justify-center">
              <FaUserCircle className="text-6xl text-gray-500" />
            </div>
            {!showMsg ? (
              <>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your registered email"
                  className={inputCss}
                  onChange={inputEvent}
                  value={userEmail}
                  autoComplete="off"
                />
                <button
                  className="py-2 bg-blue-400 text-white text-lg hover:bg-blue-500"
                  type="submit"
                  onClick={handleSendEmail}
                >
                  Send reset link
                </button>
              </>
            ) : (
              <div>
                <span className="text-base text-green-700">
                  Email successfully send to {userEmail} Valid only for 5
                  minutes.
                </span>
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/login"
                className="text-base text-gray-600 hover:underline hover:text-blue-500"
              >
                Login
              </Link>
              <span>|</span>
              <Link
                to="/Signup"
                className="text-base text-gray-600 hover:underline hover:text-blue-500"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
