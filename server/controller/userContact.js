const express = require("express");
const UserContact = require("../model/contactSchema");
const transporter = require("../config/transporter");

const userContact = async (req, res) => {
  try {
    const { userName, userEmail, userMsg } = req.body;
    if (!userName && !userEmail && !userMsg) {
      return res.status(400).json({ msg: "All fields are required..." });
    }

    const checkExistence = await UserContact.findOne({ userEmail });
    if (checkExistence) {
      return res.json({ msg: "user already exist" });
    } else {
      const newMsg = await new UserContact({ userName, userEmail, userMsg });
      await newMsg.save();
      const details = {
        from: userEmail,
        to: process.env.EMAIL,
        subject: `Message from ${userName}`,
        html: `<h1>User Details:</h1> <br/>
                        <span>User Name:  ${userName} </span> <br/>
                        <span>User Name:  ${userEmail} </span> <br/>
                        <span>User Name:  ${userMsg} </span> <br/>`,
      };
      transporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Some error occured during mail" });
        } else {
          return res.json({ msg: "msg send successfully..." });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: "some error occured..." });
  }
};

module.exports = userContact;
