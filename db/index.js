const mongoose = require("mongoose");

// connect MongoDB
mongoose.connect(
  "mongodb+srv://sairajepawar994:okSqV5xEO0qsG6cq@cluster0.4f3zrvx.mongodb.net/todoList"
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
