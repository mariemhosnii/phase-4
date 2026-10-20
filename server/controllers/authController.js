const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const authResponse = (res, status, user) =>
  res.status(status).json({
    token: createToken(user._id.toString()),
    user: { id: user._id, email: user.email },
  });

const register = async (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "An account with this email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });
    return authResponse(res, 201, user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    return res.status(500).json({ message: "Unable to create account" });
  }
};

const login = async (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";

  try {
    const user = await User.findOne({ email }).select("+password");
    const passwordMatches = user && await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.status(401).json({ message: "Email or password is incorrect" });
    return authResponse(res, 200, user);
  } catch (error) {
    return res.status(500).json({ message: "Unable to log in" });
  }
};

module.exports = { register, login };