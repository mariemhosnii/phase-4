const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, trim: true, default: "" },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // In Phase 2 we will add: user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
