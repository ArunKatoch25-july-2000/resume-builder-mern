const express = require("express");

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("uid");
    res.json({ msg: "success" });
  } catch (err) {
    res.json({ msg: "error" });
  }
};
module.exports = logoutUser;
