const { DishModel } = require("../model/dish.model");

const addDishController = async (req, res) => {
  try {
    const { name, description, price, category, image, ingredients, offer } =
      req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const newDish = await DishModel({
      name,
      description,
      price,
      category,
      image,
      ingredients,
      offer,
    });
    await newDish.save();
    return res
      .status(201)
      .json({ message: "New Dish created", NewDish: newDish });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const getDishController = async (req, res) => {
  try {
    const data = await DishModel.find();
    if (data.length == 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      message: "Dishes fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { addDishController, getDishController };
