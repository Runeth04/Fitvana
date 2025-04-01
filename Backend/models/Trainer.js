const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // in years
    required: true,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },
  certifications: {
    type: [String], // List of certification titles
    default: [],
  },
  profileImage: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  socialLinks: {
    linkedIn: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
