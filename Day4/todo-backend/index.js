const express = require("express");
const connection = require("./config/db");
const { todoRouter } = require("./Router/todo.router");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use(cors());
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Todo backend listening at http://localhost:${port}`);
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
});
