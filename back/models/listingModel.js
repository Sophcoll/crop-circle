const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// image: {
//     data: Buffer,
//     contentType: String,
//     },

// sellerId: {
//   type: Number,
//   required: true,
// },

const listingSchema = new Schema(
  {
    exchange: {    
      type: String,
      required: true,
    },
    exchangeDescription: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    pickup: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
