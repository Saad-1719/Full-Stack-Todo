const express = require('express');
const cors = require("cors");
const ToDoRouter = require("./routes/todo.route");
const app = express();
const UserRouter=require("./routes/user.route")

app.use(cors());

app.use(express.json());


app.use("/api/todo", ToDoRouter);

// app.use("/api/todo", ToDoRouter);

app.use("/api/user", UserRouter);

module.exports = app

