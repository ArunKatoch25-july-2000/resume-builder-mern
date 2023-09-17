import React, { useState, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "./Login_SignUp/baseUrl";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMobMenuDiv, setShowMobMenuDiv] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const logoutUserEvent = async (e) => {
    e.preventDefault();
    const logOut = await axios.get(`${baseURL}/logout`, {
      credentials: "include",
      withCredentials: true,
    });
    const logoutStatus = await logOut.data.msg;
    if (logoutStatus === "success") {
      window.alert("logout successfully..");
      setLoginStatus((loginStatus) => false);
      setShowMobMenuDiv((showMobMenuDiv) => false);
      navigate("/signup");
    } else {
      window.alert("something went wrong..");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const getUserLoginStatus = await axios.get(`${baseURL}/`, {
        credentials: "include",
        withCredentials: true,
      });
      const msg = await getUserLoginStatus.data.msg;
      if (msg === "authenticated user") {
        setLoginStatus((loginStatus) => true);
      } else {
        setLoginStatus((loginStatus) => false);
      }
    }
    fetchData();
  }, []);
  return (
    <nav className="flex items-center justify-between p-2 bg-sky-400 relative sm:px-5 sm:py-2">
      {/* ------ Logo ----- */}
      <div className="flex items-center justify-center gap-2 cursor-pointer">
        <Link to="/">
          <HiOutlineDocumentText className="text-white text-lg  sm:text-[3rem]" />
        </Link>
        <div className="flex flex-wrap gap-1 sm:flex-col sm:gap-0">
          <span className="text-sm text-white font-extralight sm:text-base">
            Professional
          </span>
          <span className="text-sm text-white font-extralight sm:text-base">
            Resume Builder
          </span>
        </div>
      </div>

      {/* -------++++++ Menu Btn ++++++++ ------- */}

      <FiMenu
        className="text-white text-lg ml-2 cursor-pointer sm:m-0 sm:text-[2rem] "
        onClick={() => {
          showMobMenuDiv ? setShowMobMenuDiv(false) : setShowMobMenuDiv(true);
        }}
      />
      {showMobMenuDiv && (
        <div className="absolute border px-2 py-1 top-full bg-gray-400 right-0 z-10">
          <ul>
            <li>
              {!loginStatus ? (
                <Link
                  to="/signup"
                  className="text-sm text-white cursor-pointer "
                >
                  Register / Login
                </Link>
              ) : (
                <button
                  className="text-sm text-white cursor-pointer "
                  onClick={logoutUserEvent}
                >
                  Logout
                </button>
              )}
            </li>
            <li>
              <Link
                to="/my-resumes"
                className="text-sm text-white cursor-pointer "
              >
                My Resumes
              </Link>
            </li>
            <li>
              {loginStatus && (
                <Link
                  to="/contact"
                  className="text-sm text-white cursor-pointer "
                >
                  Contact
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
