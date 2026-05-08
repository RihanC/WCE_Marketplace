const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    maxlength: 200,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    enum: [
      "Books",
      "Stationary",
      "Electronics",
      "Furniture",
      "Clothing",
      "Transport",
      "Others",
    ],
    required: true,
  },

  image: {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
