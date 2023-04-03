const Listing = require('../models/listingModel');
const mongoose = require('mongoose');
const multer = require("multer");
const fs = require("fs");
const path = require("path");


//----------------------------------------------------------------------
// GET all listings, sorted by newest created

const getAllListings = async (req, res) => {
  const listings = await Listing.find({}).sort({ createdAt: -1 });

  res.status(200).json(listings);
};

//----------------------------------------------------------------------
// GET a single listing

const getListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such id' });
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return res
      .status(404)
      .json({ error: 'cannot get listing, no such listing' });
  }

  res.status(200).json(listing);
};

//----------------------------------------------------------------------
// POST a new listing

const createListing = async (req, res) => {

  // specify what needs to be sent in the request body to align with the listingModel

  const {
    exchange,
    exchangeDescription,
    name,
    description,
    quantity,
    location,
    pickup,
    image,
  } = req.body;


  // ERROR HANDLING
  // detect which fields are empty when user adds listing, save these in an array, then send that back to the client
  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!quantity) {
    emptyFields.push('quantity');
  }
  if (!location) {
    emptyFields.push('location');
  }
  if (!pickup) {
    emptyFields.push('pickup');
  }
  // if any of the above values are missing, push them into the emptyFields array

  // now count emptyFields array, if length more than 0, there is an error - return to client
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // ADDING NEW LISTING ENTRY TO DATABASE
  try {
    // we have access to the user object because we attached it to the req object within the middleware function that checks whether or not a user is logged in
    const author = req.user._id;

    await Listing.create({
    exchange: req.body.exchange,
    exchangeDescription: req.body.exchangeDescription,
    name: req.body.name,
    image: req.body.file.file,
    description: req.body.description,
    quantity: req.body.quantity,
    location: req.body.location,
    pickup: req.body.pickup,
  })


    // send the listing back as json to the client
    res.status(200).json(listing);

  } catch (error) {
    // error handling if entry doesn't work
    res.status(400).json({ error: error.message });
  }
};

//----------------------------------------------------------------------
// UPDATE a listing

const updateListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'cant update because no such id' });
  }
  const listing = await Listing.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!listing) {
    return res
      .status(404)
      .json({ error: 'cant update listing because no such listing' });
  }

  res.status(200).json(listing);
};

//----------------------------------------------------------------------
// DELETE a single listing

const deleteListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such id' });
  }

  const listing = await Listing.findOneAndDelete({ _id: id });

  if (!listing) {
    return res
      .status(404)
      .json({ error: 'cant delete listing because no such listing' });
  }
}

// ----------------------------------------------------------------------
// UPLOAD image
const uploadImage = async (req, res) => {
  console.log('file:' + JSON.stringify(req.file.path));
    if (!req.file) {
      res.json({mssg: 'no image received'})
    }
    else {
      const image = new Listing({
        image: {
          data: fs.readFileSync(
            path.join(__dirname + "/uploads/" + req.file.filename)
          ),
          contentType: "image.png",
        }
      })
      image.save(() => {
        fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
        res.json({mssg: "saved"})
      })
    }
  }

  // ----------------------------------------------------------------------
// GET image
  const getImage = async (req, res) => {
    Listing.find({}, (error, results) => {
      if (error) {
        console.log(error)
      } else {
        res.send(results)
      }
    }).lean();
  }


//----------------------------------------------------------------------
// export functions to controller

  module.exports = {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
    uploadImage,
    getImage,
  }