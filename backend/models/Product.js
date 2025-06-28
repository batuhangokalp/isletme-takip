const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Halı", "Kilim", "Yorgan", "Diğer"],
      required: true,
    },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    color: { type: String },
    description: { type: String },
    pricePerSquareMeter: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
