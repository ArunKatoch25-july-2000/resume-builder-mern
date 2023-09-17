const express = require("express");

const checkUserLogin = async (req, res) => {
  res.status(200).json({ msg: "authenticated user" });
};

module.exports = checkUserLogin;
