const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  userEmail: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  userMsg: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500,
  },
});

const UserContact = new mongoose.model("USER_CONTACT_DETAIL", contactSchema);

module.exports = UserContact;
