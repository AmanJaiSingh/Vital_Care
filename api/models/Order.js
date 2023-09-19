const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    status: { type: String, default: "pending" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
