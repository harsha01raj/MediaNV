const express = require("express");
const auth = require("../middleware/auth");
const {
  addDishController,
  getDishController,
} = require("../controller/Dishcontroller");

const dishRouter = express.Router();

dishRouter.get("/", auth, getDishController);
dishRouter.post("/", auth, addDishController);

module.exports = dishRouter;
