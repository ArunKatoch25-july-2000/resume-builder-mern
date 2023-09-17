const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateNewPassword = async (req, res) => {
  try {
    const { token, id } = req.params;
    const { password } = req.body;
    const findUser = await User.findOne({ _id: id });

    if (findUser) {
      const secret = findUser._id + process.env.SECRET_KEY;

      const verify = jwt.verify(token, secret);

      if (verify) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUser = await User.findByIdAndUpdate(
          findUser._id,
          { password: hashedPassword },
          { new: true }
        );

        return res.status(201).json({
          msg: "password updated successfully...",
        });
      } else {
        return res.status(400).json({ msg: "Not a verified User" });
      }
    }
  } catch (err) {
    res.status(400).json({ msg: "Not a verified user" });
  }
};

module.exports = generateNewPassword;
