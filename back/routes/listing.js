const express = require('express')
const multer = require("multer");
const path = require('path')


// import functions from controller folder
const {
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing, 
    uploadImage,
    getImage,
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



// --------------------------------------------------------------------------------------------------------------
// IMAGE

// store files on server
const storage = multer.diskStorage({
// define the folder for the image to upload to
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
// define filename to use
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    },
});

// const fileFilter = (req, res, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, true);
//     } else {
//         cb(null, false)
//     }
// }

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5242880
    },
    // fileFilter: fileFilter,   
}
)

// UPLOAD image
router.post("/upload", upload.single('attachment'), uploadImage)

// GET image
router.get("/:id", getImage)

module.exports = router