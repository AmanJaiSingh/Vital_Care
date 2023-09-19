const mongoose = require("mongoose");

const CompOrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    OrderId: { type: String, required: true },
    status: { type: String, default: "pending" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CompOrder", CompOrderSchema);
