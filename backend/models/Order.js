const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: String,
        qty: Number,
        size: String,
        image: String,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Pending, Paid, Shipped
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
