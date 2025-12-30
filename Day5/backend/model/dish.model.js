const mongoose = require("mongooseo");

const dishSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  description: { type: String, require: true, trim: true },
  price: { type: Number, require: true },
  category: {
    type: String,
    enum: ["starter", "main", "dessert", "beverage"],
    required: true,
  },
  image: { type: String },
  ingredients: {
    type: [String],
    required: true,
  },
  offer: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DishModel = mongoose.model(Dish, dishSchema);

module.exports = { DishModel };
