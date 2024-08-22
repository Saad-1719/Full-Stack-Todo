const { Router } = require('express');
const { addToDo, updateToDo, fetchToDo, deleteToDo } = require("../controllers/todo.controller")
const toDoRouter = Router();


toDoRouter.route("/").post(addToDo);

toDoRouter.route("/").get(fetchToDo)
toDoRouter.route("/:id").put(updateToDo);
toDoRouter.route("/:id").delete(deleteToDo);


module.exports = toDoRouter;