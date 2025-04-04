const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Trainer = require("../models/Trainer");

// Serve uploaded files statically (if not done in main app.js)
// const path = require('path');
// router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Storage config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage });

// Middleware to verify admin access
const authorizeAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admin access only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

// GET all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ error: "Server error while fetching trainers." });
  }
});

// GET trainer by ID
router.get("/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ error: "Trainer not found." });
    res.json(trainer);
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({ error: "Server error while fetching trainer." });
  }
});

// POST create trainer with image upload
router.post("/", authorizeAdmin, upload.single("profileImage"), async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      email,
      contact,
      specialization,
      experience,
      bio,
      certifications,
      rating,
      isActive,
      socialLinks,
    } = req.body;

    const newTrainer = new Trainer({
      firstname,
      lastname,
      gender,
      email,
      contact,
      specialization,
      experience,
      bio,
      certifications: certifications ? certifications.split(",") : [],
      rating,
      isActive,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      profileImage: req.file ? req.file.filename : "",
    });

    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) {
    console.error("Error creating trainer:", error);
    res.status(500).json({ error: "Server error while creating trainer." });
  }
});

// PUT update trainer (optionally upload new image)
router.put("/:id", authorizeAdmin, upload.single("profileImage"), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      certifications: req.body.certifications ? req.body.certifications.split(",") : [],
      socialLinks: req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {},
    };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrainer) {
      return res.status(404).json({ error: "Trainer not found." });
    }

    res.json(updatedTrainer);
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ error: "Server error while updating trainer." });
  }
});

// DELETE trainer
router.delete("/:id", authorizeAdmin, async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ error: "Trainer not found." });
    }
    res.json({ message: "Trainer deleted successfully." });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ error: "Server error while deleting trainer." });
  }
});

module.exports = router;
