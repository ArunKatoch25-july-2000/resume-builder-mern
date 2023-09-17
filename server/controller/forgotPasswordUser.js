const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const transporter = require("../config/transporter");
const jwt = require("jsonwebtoken");

const forgotPasswordUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const checkUser = await User.findOne({ email: userId });
    if (checkUser) {
      const secret = checkUser._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userId: checkUser._id }, secret, {
        expiresIn: "5m",
      });
      const resetLink = `http://localhost:5173/resetpassword/${token}/${checkUser._id}`;
      const details = {
        from: process.env.EMAIL,
        to: checkUser.email,
        subject: "Professional resume builder - Link for password reset",
        html: `<h1>This link is valid only for 5 minutes...</h1>
                     <br/>
                     <a href=${resetLink}>${resetLink}</a>`,
      };
      transporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Some error occured during mail" });
        } else {
          return res.json({ msg: "email send successfully." });
        }
      });
      return res
        .status(200)
        .json({ msg: "Valid Email", email: "email send successfully..." });
    } else {
      return res
        .status(400)
        .json({ msg: "Invalid email", email: "Email not send" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};

module.exports = forgotPasswordUser;
