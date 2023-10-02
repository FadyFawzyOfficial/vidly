const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

//! Compile Genre Schema into a Genre Model (Class)
const Genre = mongoose.model("Genre", genreSchema);

const genres = [
  { id: 1, name: "All" },
  { id: 2, name: "Action" },
  { id: 3, name: "Adventure" },
  { id: 4, name: "Animation" },
  { id: 5, name: "Biography" },
  { id: 6, name: "Comedy" },
  { id: 7, name: "Crime" },
];

router.get("/", (request, response) => response.send(genres));

router.post("/", (request, response) => {
  const { error } = validateGenre(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: request.body.name,
  };

  genres.push(genre);
  response.send(genre);
});

router.get("/:id", (request, response) => {
  const genre = genres.find(
    (genre) => genre.id === parseInt(request.params.id)
  );

  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  response.send(genre);
});

router.put("/:id", (request, response) => {
  // 1. Look out the genre
  // If not exist, return 404
  const genre = genres.find(
    (genre) => genre.id === parseInt(request.params.id)
  );

  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  // 2. Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateGenre(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  // 3. Update Genre
  // Return the updated Genre
  genre.name = request.body.name;
  response.send(genre);
});

router.delete("/:id", (request, response) => {
  // 1. Look out the genre
  // If not exist, return 404
  const genre = genres.find(
    (genre) => genre.id === parseInt(request.params.id)
  );

  if (!genre)
    return response
      .status(404)
      .send("The genre with the given id was not found");

  // Delete Genre
  const genreIndex = genres.indexOf(genre);
  genres.splice(genreIndex, 1);

  // Return the deleted Genre
  response.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().required() });
  return schema.validate(genre);
}

module.exports = router;
