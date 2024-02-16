const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routers/user');

const app = express();
const port = 3000;

app.use(express.json()); //middleware to parse json

// defining the routes
app.use('/user',userRouter);

app.listen(port, () => {
  console.log(`Server is lauched on ${port}`);
});
