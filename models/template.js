const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Enter a title"
  }
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;