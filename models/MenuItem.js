const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: {
  type: String,
  required: false,
},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("MenuItem", menuItemSchema);