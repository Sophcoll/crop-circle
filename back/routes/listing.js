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
router.get('/listings', getAllListings)

// GET single listing
router.get('/listings/:id', getListing)

// POST a new listing
router.post('/listings', createListing)

// UPDATE a listing
router.put('/listings/:id', updateListing)

// DELETE a listing
router.delete('/listings/:id', deleteListing)



module.exports = router