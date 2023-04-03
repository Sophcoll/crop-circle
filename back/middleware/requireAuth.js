const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify authentication by using an authorization headers request property - this should contain our JSON web token
  const { authorization } = req.headers;

  // we first need to make sure that there is an authorization value specified in the request header
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // split the string web token which is authorization to the second part of the array the actual token, the second item
  const token = authorization.split(' ')[1];


  // we then need to verify that this token hasn't been tampered with using the JSON web token package
  try {
    // once verified, it then returns the payload of that token so we are able to grab the id from the token from the payload and store it in a constant
    const { _id } = jwt.verify(token, process.env.SECRET);

    // this makes sure that the user can access the listings that they have created. Will just pass down the id and not the email or password.
    req.user = await User.findOne({ _id }).select('_id');

    // go to the next piece of middleware (controller functions)
    next();
    
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;