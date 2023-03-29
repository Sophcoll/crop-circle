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

const messageSchema = new Schema(
  {
    sellerId: {    
      type: Number,
      required: true,
    },
    buyerId: {    
        type: Number,
        required: true,
      },
    listingId: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
