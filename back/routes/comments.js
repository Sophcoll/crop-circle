const express = require("express");
// import the controller functions
const {
  createComment,
  deleteComment,
} = require("../controller/commentController");

// instantiate middleware 'requireAuth' to check that the user making the request is authenticated before firing any listing controller function
const requireAuth = require('../middleware/requireAuth');

// create a router, and set mergeParams to true so that we can access the params from the parent router
const router = express.Router({ mergeParams: true });

// require auth for all listing routes 
router.use(requireAuth); 


//----------------------------------------------------------------------
//ROUTES 

// POST a new comment
router.post("/", createComment);

// get comment

// edit comment

// delete comment
router.delete("/:commentId", deleteComment);

// etc etc


//----------------------------------------------------------------------
module.exports = router;
