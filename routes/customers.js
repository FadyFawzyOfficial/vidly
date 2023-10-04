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

router.get("/", async (request, response) => {
  const customers = await Customer.find().sort("name");
  response.send(customers);
});

router.get("/:id", async (request, response) => {
  const customer = await Customer.findById(request.params.id);

  if (!customer)
    return response
      .status(404)
      .send("The Customer with the given id was not found");

  response.send(customer);
});

module.exports = router;
