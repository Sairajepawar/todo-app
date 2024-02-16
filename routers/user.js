const express = require("express");
const router = express.Router();
const { todos } = require("../db/index");
const { createTodo, updateTodo } = require("../types");

router.use(express.json());

// load all the todos
router.get("/todos", async (req, res) => {
  try {
    const todoList = await todos.find();
    res.json(todoList);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//  create todo
router.post("/todos/create", async (req, res) => {
  // const { title, description } = req.body;
  // add the request schema verification using zod
  const payload = req.body;
  const parsePayload = createTodo.safeParse(payload);
  if (!parsePayload.success) {
    console.log("Wrong schema of request body");
    res.status(400).json({
      error: "Bad Request",
    });
  }
  // add this todo's in database
  try {
    await todos.create({
      title: title,
      description: description,
      state: true,
    });
    res.json({
      message: "Todo created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Internal Server Error",
    });
  }
});

// make todos as done
router.put("/todos/done/:id", async (req, res) => {
  
  // database logic to toggle the boolean
  const payload = req.params;
  const parsePayload = updateTodo.safeParse(payload);
  if (!parsePayload.success){
    console.log("Wrong schema for request body")
    res.status(400).json({
      err : "Bad Request"
    })
  }
  const id = req.params.id;
  try {
    const data = await todos.findOne({ _id: id });
    if (data) {
      data.state = false;
      await data.save();
      res.json({
        message: "Todo marked as done",
      });
    } else {
      // todo item is not present
      console.log("Todo not found");
      res.status(404).json({
        error: "Invalid ID",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Internal Server Error",
    });
  }
});

// remove todos
router.delete("/todos/remove/:id", async (req, res) => {
  // database logic to remove the todos
  const payload = req.params;
  const parsePayload = updateTodo.safeParse(payload);if (!parsePayload.success){
    console.log("Wrong schema for request body")
    res.status(400).json({
      err : "Bad Request"
    })
  }
  const id = req.params.id;
  try {
    await todos.findOneAndDelete({ _id: id });
    res.json({
      message: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Internal Server Error",
    });
  }
});

// exporting the routers so that index can access it
module.exports = router;
