const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be set in the environment");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Task Management API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
