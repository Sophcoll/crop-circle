const express = require('express')

// import functions from controller folder
const {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
} = require('../controller/listingController')

const router = express.Router();

// GET all listings
router.get('/', getAllListings)

// GET single listing
router.get('/:id', getListing)

// POST a new listing
router.post('/', createListing)

// UPDATE a listing
router.put('/:id', updateListing)

// DELETE a listing
router.delete('/:id', deleteListing)



module.exports = router