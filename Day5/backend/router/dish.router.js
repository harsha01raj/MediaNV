const express = require("express");
const auth = require("../middleware/auth");
const addDishController = require("../controller/Dishcontroller");

const dishRouter = express.Router();

dishRouter.post("/", auth, addDishController);

module.exports = dishRouter;
