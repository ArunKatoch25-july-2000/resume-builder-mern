const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    const loginToken = req.cookies.uid;
    const verifyUser = jwt.verify(loginToken, process.env.SECRET_KEY);
    if (verifyUser) {
      next();
    } else {
      return res.json({ msg: "user not authenticated" });
    }
  } catch (err) {
    return res.json({ msg: "user not authenticated" });
  }
};

module.exports = authenticateUser;
