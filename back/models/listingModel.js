/*  The author field within the listingModel is a reference to the user's ID in the database, so we'll need to use the populate method to replace the author field with the user's data from the database.
Posts also have comments embedded in them as subdocuments, which is done by importing the Comment model and using the schema as a field in the Post model. */
const mongoose = require('mongoose');

// need to instantiate our commentModel so that it can be used as a subdocument within the schema
const Comment = require('../models/commentModel');

const Schema = mongoose.Schema;

// image: {
//     data: Buffer,
//     contentType: String,
//     },

// sellerName: {
//   type: String,
//   required: true,
// },

// sellerId: {
//   type: String,
//   required: true,
//   unique: true,
// },

// author: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },

// add comment as a subdocument of post (since Comment is the model which is exported, we can access its schema by calling Comment.schema)
// comments: [Comment.schema]

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

module.exports = mongoose.model('Listing', listingSchema);
