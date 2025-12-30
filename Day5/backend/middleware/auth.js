const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({ messagae: "Error in authentication" });
  }
};

module.exports=auth;