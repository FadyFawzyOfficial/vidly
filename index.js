const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "All" },
  { id: 2, name: "Action" },
  { id: 3, name: "Adventure" },
  { id: 4, name: "Animation" },
  { id: 5, name: "Biography" },
  { id: 6, name: "Comedy" },
  { id: 7, name: "Crime" },
];

app.get("/", (request, response) => response.send("Welcome to Vidly"));

app.get("/api/genres", (request, response) => response.send(genres));

app.get("api/genres/:id", (request, response) => {
  const genre = genres.find(
    (genre) => genre.id === parseInt(request.params.id)
  );

  if (!genre) {
    response.status(404).send("The genre with the given id was not found");
    return;
  }

  response.send(genre);
});

app.post("api/genres", (request, response) => {
  const schema = Joi.object({ name: Joi.string().required() });
  const validation = schema.validate(request.body);
  
  if (validation.error) {
    response.status(400).send(validation.error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: request.body.name,
  };

  genres.push(genre);
  response.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
