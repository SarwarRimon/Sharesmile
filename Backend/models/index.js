// models/index.js
const User = require("./userModel");
const Donation = require("./DonationModel");
const Message = require("./ContactModel"); // Assuming this is the model for contact messages
 // Only if you have or plan to have a campaign model

module.exports = {
  User,
  Donation,
  Message,

};
