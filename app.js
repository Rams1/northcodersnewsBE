const express = require("express");
const app = express();
const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const cors = require("cors");

//DB connection
mongoose.connect(DB_URL).then(() => console.log(`connected to ${DB_URL}`));

// middleware
app.use(cors());
app.use(express.static("public"));
app.set("view-engine", "ejs");

app.use(bodyParser.json());
app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.render("pages/index.ejs");
});

//Error Handling
app.use("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 400) res.status(400).send({ message: "Bad request." });
  else next(err);
});
app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: "Page not found." });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ err });
});

module.exports = app;
