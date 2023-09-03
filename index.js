const express = require("express");
const app = express();

const genres = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
];

app.get("/", (request, response) => response.send("Welcome to Vidly"));

app.get("/api/genres", (request, response) => response.send(genres));

app.listen(3000, () => console.log("Listening on port 3000 ..."));
