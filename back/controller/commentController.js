const Listing = require('../models/listingModel');
const Comment = require('../models/commentModel');

//----------------------------------------------------------------------
// POST A COMMENT - adds a new comment to a listing in the database

/* This code adds a new comment to a post in a database. 
It first finds the post by its ID in the URL parameters, 
then creates a new comment with data from the request body and the user's ID from the URL parameters. 
The comment is added to the post's comments array as a subdocument, 
and the updated post is saved to the database and sent back to the client. */

const createComment = async (req, res) => {
  try {
    // find the listing we want to add the comment to by its ID in the URL params (from the route)
    // 'id' corresponds to what is written on the listing routers url parameter
    const listing = await Listing.findById(req.params.id);

    // if the listing doesn't exist, throw an error
    if (!listing) throw new Error('Listing not found');

    const comment = new Comment({
      // spread the data from the request body into the new comment
      ...req.body,

      // we have access to the user object because we attached it to the req object within the middleware function that checks whether or not a user is logged in
      author: req.user._id,
      // create a new comment with the data from the request body and the user's ID from the URL params (from the route)
    });

    // add the comment to the post's comments array (this is a sub-document)
    listing.comments.push(comment);

    // save the listing to the database and get the updated listing back from the database
    const updatedListing = await listing.save();

    // send back the updated listing to the client
    res.json(updatedListing);
    
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

//----------------------------------------------------------------------
// DELETE A COMMENT - deletes a comment to a listing in the database

/*  The function retrieves a post from the database using the listingId parameter in the request object,
removes a comment from the listing's comments array using the commentId parameter in the request object, 
saves the updated listing to the database, and sends back the updated comments array to the client in the response object. 
If an error occurs, the function logs the error message and sends back an error message to the client. */

const deleteComment = async (req, res) => {
  try {
    // find the listing by its ID in the URL params
    const listing = await Listing.findById(req.params.id);

    // pull the comment from the post's comments array
    listing.comments.pull(req.params.commentId);

    // save the listing to the database
    const updatedListing = await listing.save();

    // send back the updated comments array to the client
    res.json(updatedListing.comments);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

module.exports = { createComment, deleteComment }; // export the controllers
