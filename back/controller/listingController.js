const Listing = require('../models/listingModel')
const mongoose = require('mongoose');


//----------------------------------------------------------------------
// GET all listings, sorted by newest created

const getAllListings = async (req, res) => {
    const listings = await Listing.find({}).sort({ createdAt: -1 })
    
    res.status(200).json(listings)
}

//----------------------------------------------------------------------
// GET a single listing


const getListing = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such id'})
    }
        
    const listing = await Listing.findById(id)

    if (!listing) {
        return res.status(404).json({error: "cannot get listing, no such listing"})
    }

    res.status(200).json(listing)
}


//----------------------------------------------------------------------
// POST a new listing

const createListing = async (req, res) => { 
    const { exchange, exchangeDescription, name, description, quantity, location, pickup } = req.body

// create new listing
    
    
// add to database
    try {
        const listing = await Listing.create({ exchange, exchangeDescription, name, description, quantity, location, pickup })
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//----------------------------------------------------------------------
// UPDATE a listing
const updateListing = async (req, res) => {
    res.json({mssg: 'update a listing'})
 }


//----------------------------------------------------------------------
// DELETE a single listing
const deleteListing = async (req, res) => {
    res.json({mssg: 'delete a listing'})
 }



//----------------------------------------------------------------------
// export functions to controller
module.exports = {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
}