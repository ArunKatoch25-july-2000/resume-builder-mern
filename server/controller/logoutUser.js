const express = require("express");

const logoutUser = async (req, res) => {
  try {
    await res
      .clearCookie("uid", {
        sameSite: "none",
        secure: true,
      })
      .json({ msg: "success" });
  } catch (err) {
    res.json({ msg: "error" });
  }
};
module.exports = logoutUser;
