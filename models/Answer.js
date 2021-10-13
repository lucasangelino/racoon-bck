const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const answerSchema = new Schema({
  answers: [
    {
      author: String,
      content: String,
    },
  ],
});
answerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;
