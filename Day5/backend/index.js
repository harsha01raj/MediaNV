const express = require("express");
const { connection } = require("./config/db");
const userRouter = require("./router/user.router");
const cors = require("cors");
const dishRouter = require("./router/dish.router");
require("dotenv").config();
const port = process.env.PORT | 3001;
console.log(port);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/dish", dishRouter);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to my server" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Server is successully connected to the database");
    console.log(`Server is running on port http://localhost:${port}`);
  } catch (error) {
    console.error("There is error in connection with mongo db");
  }
});
