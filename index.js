require("dotenv").config();
require("./mongo");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleErrors");

const express = require("express");
const cors = require("cors");

// Schemas
const Answer = require("./models/Answer");
const Question = require("./models/Question");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.json("listening...");
});

app.get("/api/answers/latest", (req, res) => {
  Answer.find({})
    .then((answers) => {
      res.status(200).json(answers);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

app.get("/api/question", (req, res) => {
  Question.find({})
    .then((question) => {
      res.status(200).json(question);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

app.post("/api/answer", jsonParser, (req, res) => {
  if (!req.body.author || !req.body.content) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const answer = req.body;
  const newAnswer = new Answer({
    author: answer.author,
    content: answer.content,
  });
  newAnswer.save().then((savedAnswer) => {
    return res.status(201).json({ code: 201, message: "Respuesta Creada" });
  });
});

app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});
