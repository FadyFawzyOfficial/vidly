const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
});

//! Compile Genre Schema into a Genre Model (Class)
const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (request, response) => {
  const genres = await Genre.find().sort("name");
  response.send(genres);
});

router.post("/", async (request, response) => {
  const { error } = validateGenre(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  //! Create an Object based on Genre Class (Model)
  let genre = new Genre({ name: request.body.name });
  //! Save a Model (Genre) Data as a Document to MongoDB
  genre = await genre.save();

  //* Return the saved genre to the client with its created id.
  response.send(genre);
});

router.get("/:id", async (request, response) => {
  const genre = await Genre.findById(request.params.id);

  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  response.send(genre);
});

router.put("/:id", async (request, response) => {
  //! We need to validate this genre that we are getting in the request before
  //! attempting to update the database.
  // 1. Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: request.body.name,
      },
    },
    // To return the document after updating, and this optional object
    { new: true }
  );

  // 2. Look out the genre
  // If not exist, return 404
  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  //* The genre we got here is the updated genre
  response.send(genre);
});

router.delete("/:id", async (request, response) => {
  // 1. Look out the genre
  // If not exist, return 404
  const genre = await Genre.findByIdAndRemove(request.params.id);

  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  // Return the deleted Genre
  response.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().required() });
  return schema.validate(genre);
}

module.exports = router;
