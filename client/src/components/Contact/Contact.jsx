import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import contact from "../../assets/contact.svg";
import { RiContactsLine } from "react-icons/ri";
const inputCss = "w-[18rem] border px-1 py-2 outline-blue-400 rounded-sm";

const Contact = () => {
  const navigate = useNavigate();
  const [userContact, setUserContact] = useState({
    userName: "",
    userEmail: "",
    userMsg: "",
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setUserContact((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const sendMsgHandler = async (e) => {
    e.preventDefault();

    if (
      !userContact.userName &&
      !userContact.userEmail &&
      !userContact.userMsg
    ) {
      window.alert(`All fields are required`);
      return;
    }

    const submitForm = await axios.post(
      "http://localhost:8080/contact",
      userContact,
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    const msg = await submitForm.data.msg;
    if (msg === "user already exist") {
      window.alert("You already messaged with this number");
      return;
    }

    if (msg === "user not authenticated") {
      window.alert(`Login first`);
      navigate("/login");
      return;
    } else if (msg === "msg send successfully...") {
      window.alert(`Your message send successfully...`);
      setUserContact((userContact) => {
        return {
          ...userContact,
          userName: "",
          userEmail: "",
          userMsg: "",
        };
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="w-full flex items-center justify-center md:h-screen">
        <div className=" hidden md:flex items-center justify-center w-[50%] h-full">
          <img src={contact} alt="signup_img" className="w-[80%]" />
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
              <RiContactsLine className="text-6xl text-gray-500" />
            </div>
            <input
              type="text"
              name="userName"
              placeholder="Enter your name"
              className={inputCss}
              autoComplete="off"
              value={userContact.userName}
              onChange={inputEvent}
            />
            <input
              type="email"
              name="userEmail"
              placeholder="Enter your valid email here"
              className={inputCss}
              autoComplete="off"
              value={userContact.userEmail}
              onChange={inputEvent}
            />
            <textarea
              rows="5"
              type="text"
              name="userMsg"
              placeholder="Enter your msg here"
              className={`${inputCss} resize-none`}
              autoComplete="off"
              value={userContact.userMsg}
              onChange={inputEvent}
            />
            <button
              className="py-2 bg-blue-400 text-white text-lg hover:bg-blue-500"
              onClick={sendMsgHandler}
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
