const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
