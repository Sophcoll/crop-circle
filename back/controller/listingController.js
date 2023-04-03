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
  // const {
  //   exchange,
  //   exchangeDescription,
  //   name,
  //   image,
  //   description,
  //   quantity,
  //   location,
  //   pickup,
  // } = req.body;
 

  // // add to database
  // try {
  //   const listing = await Listing.create({
  //     exchange,
  //     exchangeDescription,
  //     name,
  //     image,
  //     description,
  //     quantity,
  //     location,
  //     pickup,
  //   });
  //   res.status(200).json(listing);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
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