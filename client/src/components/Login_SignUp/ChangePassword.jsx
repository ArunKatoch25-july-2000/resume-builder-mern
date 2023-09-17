import { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import forgot_password from "../../assets/forgot_password.svg";
import { FaUserCircle } from "react-icons/fa";
import baseURL from "./baseUrl";
const inputCss = "w-[18rem] border px-1 py-2 outline-blue-400 rounded-sm";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token, id } = useParams();
  const [userDetails, setUserDetails] = useState({
    password: "",
    confirmPassword: "",
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (userDetails.password === userDetails.confirmPassword) {
      try {
        const res = await axios.patch(
          `${baseURL}/resetpassword/${token}/${id}`,
          {
            password: userDetails.password,
          },
          {
            credentials: "include",
            withCredentials: true,
          }
        );
        const msg = await res.data.msg;
        if (msg === "password updated successfully...") {
          setUserDetails((userDetails) => {
            return {
              ...userDetails,
              password: "",
              confirmPassword: "",
            };
          });
          window.alert(res.data.msg);
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert(`password and confirm password mismatch`);
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
            <input
              type="password"
              name="password"
              placeholder="Enter your new password"
              className={inputCss}
              onChange={inputEvent}
              value={userDetails.password}
              autoComplete="off"
            />
            <input
              type="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your Password"
              className={inputCss}
              onChange={inputEvent}
              value={userDetails.confirmPassword}
              autoComplete="off"
            />
            <button
              className="py-2 bg-blue-400 text-white text-lg hover:bg-blue-500"
              type="submit"
              onClick={handleUpdate}
            >
              Update password
            </button>

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

export default ChangePassword;
