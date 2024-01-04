const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const {protect} = require("../utility/check-auth.js");

router.post("/sign-up", controller.signUp);
router.post("/sign-in", controller.login);
router.post("/create-todo", protect, controller.createTodo);
router.put("/change-status", protect, controller.changeTodoStatus);
router.get("/tasks", protect ,controller.getUserTasks);
router.delete("/task/:id", protect, controller.deleteTask);
router.post("/comment", controller.addComment);

module.exports = router;