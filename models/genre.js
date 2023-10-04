const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().required() });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
