const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  phone: {
    type: String,
    required: true,
  },
  isGold: Boolean,
});

//! Compile Customer Schema into a Customer Model (Class)
const Customer = mongoose.model("Customer", customerSchema);

module.exports = router;
