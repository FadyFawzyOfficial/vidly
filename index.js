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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
