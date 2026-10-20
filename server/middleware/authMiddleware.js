const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization ? authorization.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("_id email");
    if (!user) return res.status(401).json({ message: "Invalid authentication token" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired authentication token" });
  }
};

module.exports = protect;