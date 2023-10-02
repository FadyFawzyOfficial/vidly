const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connected to MongoDB..", error));

app.use(express.json());
app.use("/api/genres", genres);

app.get("/", (request, response) => response.send("Welcome to Vidly"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
