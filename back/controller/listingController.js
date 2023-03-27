const Listing = require('../models/listingModel')
const mongoose = require('mongoose');



// GET all listings, sorted by newest created
const getAllListings = async (req, res) => {
    const listings = await Listing.find({}).sort({ createdAt: -1 })
    res.status(200).json(listing)
}

// GET a single listing
const getListing = async () => { }

// POST a new listing
const createListing = async (req, res) => { 
    const { name, exchange, location, pickup, description, message } = req.body
    
    try {
        const listing = await Listing.create({ name, exchange, location, pickup, description, message })
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// UPDATE a listing
const updateListing = async () => { }

// DELETE a single listing
const deleteListing = async () => { }


// export functions to controller
module.exports = {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
}