const { TodoModel } = require("../Model/todo.model");
const mongoose = require("mongoose");

async function todoController(req, res) {
  try {
    const { title, details } = req.body;
    if (!title || !details) {
      return res
        .status(400)
        .send({ message: "Title and Details are required" });
    }
    const existingTodo = await TodoModel.findOne({ title, details });
    if (existingTodo) {
      return res.status(409).send({ message: "Todo already exists" });
    }
    const newTodo = new TodoModel({ title, details });
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (error) {
    console.error("Error creating todo", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

const displayTodoController = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTodoController = async (req, res) => {
  const { id } = req.params;
  const { title, details } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, details },
      { new: true }
    );
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "data not found id is not in our data base" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  todoController,
  displayTodoController,
  deleteTodoController,
  updateTodoController,
};
