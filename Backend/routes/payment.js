const express = require("express");
const router = express.Router();
const PackagePayment = require("../models/Payment");

// GET all package payments
router.get("/", async (req, res) => {
  try {
    const payments = await PackagePayment.find().sort({ paidAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching payments." });
  }
});

// GET a package payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await PackagePayment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found." });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: "Error fetching payment by ID." });
  }
});

// CREATE a new package payment
router.post("/", async (req, res) => {
  try {
    const {
      nic,
      packageType,
      amount,
      paymentMethod,
      cardName,
      cardLast4,
      transactionId,
      status,
    } = req.body;

    // Basic validation for cash payments
    if (paymentMethod === "Cash") {
      if (!cardName || !cardLast4) {
        return res.status(400).json({
          error: "Card name and last 4 digits are required for cash payments.",
        });
      }
    }

    const newPayment = new PackagePayment({
      nic,
      packageType,
      amount,
      paymentMethod,
      cardName: paymentMethod === "Cash" ? cardName : undefined,
      cardLast4: paymentMethod === "Cash" ? cardLast4 : undefined,
      transactionId,
      status: status || "Pending",
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Failed to create package payment." });
  }
});

// UPDATE a package payment
router.put("/:id", async (req, res) => {
  try {
    const updated = await PackagePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Payment not found." });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Failed to update payment." });
  }
});

// DELETE a package payment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PackagePayment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Payment not found." });
    }
    res.json({ message: "Payment deleted successfully." });
  } catch (err) {
    console.error("Error deleting payment:", err);
    res.status(500).json({ error: "Failed to delete payment." });
  }
});

module.exports = router;
