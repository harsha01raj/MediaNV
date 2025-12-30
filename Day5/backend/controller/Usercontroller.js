const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ username });
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already exist please login" });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({ username, email, password: hashPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User successfully registered!!", User: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        existUser,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "user login successfully", Token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerController, loginController };
