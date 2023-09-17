const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "plz fill all the required fields..." });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          return res.status(400).json({ msg: err });
        } else {
          const password = hashedPassword;
          const user = new User({ email, password });
          await user.save();
          res.status(201).json({ msg: "user registered successfully..." });
        }
      });
    }
  } catch (e) {
    return res.status(400).json({ msg: "some error occured" });
  }
};

module.exports = registerUser;
