const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  question: String,
});
questionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;
