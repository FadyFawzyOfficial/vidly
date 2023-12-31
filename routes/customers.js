const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

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
  const { error } = validate(request.body);

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

router.put("/:id", async (request, response) => {
  //! We need to validate this customer that we are getting in the request before
  //! attempting to update the database.
  // 1. Validate
  // If invalid, return 400 - Bad Request
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: request.body.name,
        phone: request.body.phone,
        isGold: request.body.isGold,
      },
    },
    //* To Return the document after updating, add this optional object.
    { new: true }
  );

  // 2. Look out the customer
  // If not exist, return 404
  if (!customer)
    return response
      .status(404)
      .send("The Customer with the given id was not found");

  //* The customer we got here it the updated customer
  response.send(customer);
});

router.delete("/:id", async (request, response) => {
  const customer = await Customer.findByIdAndRemove(request.params.id);

  if (!customer)
    return response
      .status(404)
      .send("The customer with the given id wan not found");

  response.send(customer);
});

module.exports = router;
