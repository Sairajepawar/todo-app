const mongoose = require("mongoose");

// connect MongoDB
mongoose.connect(
  "link to the mongodb database"
);

// define schema
const todosSchema = new mongoose.Schema({
  // schema definition
  title: String,
  description: String,
  state: Boolean
});

const todos = mongoose.model("todos", todosSchema);

module.exports = {
  todos
}
