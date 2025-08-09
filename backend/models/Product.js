const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    location: String,
    description: String,
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references the User model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
