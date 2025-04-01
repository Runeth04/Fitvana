const mongoose = require("mongoose");

const packagePaymentSchema = new mongoose.Schema({
  nic: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  packageType: {
    type: String,
    enum: ["Weekly Package", "Monthly Package", "Annual Package"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ["Online", "Cash"],
    required: true,
  },
  cardName: {
    type: String,
    trim: true,
  },
  cardLast4: {
    type: String,
    validate: {
      validator: (v) => /^(\d{4} ){3}\d{4}$/.test(v), 
      message: "Card number must be in the format '1234 5678 9012 3456'",
    },
  },
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PackagePayment", packagePaymentSchema);
