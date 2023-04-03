
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const listingSchema = new Schema(
  {
    exchange: {    
      type: String,
      required: true,
    },
    exchangeDescription: {
      type: String,
    },
    image: {
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
