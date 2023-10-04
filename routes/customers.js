const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const { route } = require("./genres");
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

router.post("/", async (request, response) => {
  const { error } = validateCustomer(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  //! Create an Object based on Customer Class Model
  let customer = new Customer({
    name: request.body.name,
    phone: request.body.phone,
    isGold: request.body.isGold,
  });

  //! Save a Model (Customer) Data as a Document to MongoDB
  customer = await customer.save();

  //* Return the saved customer to the client with its created id.
  response.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });
}

module.exports = router;
