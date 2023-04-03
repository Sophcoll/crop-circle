const express = require('express')

// import functions from controller folder
const {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
} = require('../controller/listingController')

// instantiate middleware 'requireAuth' to check that the user making the request is authenticated before firing any listing controller function
const requireAuth = require('../middleware/requireAuth');


// invoke an instance of the express router 
const router = express.Router();

// require auth for all listing routes 
router.use(requireAuth); 

//----------------------------------------------------------------------
//ROUTES 

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

//----------------------------------------------------------------------

module.exports = router