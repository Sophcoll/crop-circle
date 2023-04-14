const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// to create webtoken for user (backend) - npm install jsonwebtoken
const createToken = function (_id) {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' });
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// login user, after creating check if user exists then find the token and password
const loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // res.status(200).json({email, user})

    // create token, see above function
    const token = createToken(user._id);
    const firstName = user.firstName;
    const userId = user._id;

    // res.status(200).json({ email, token });

    res.status(200).json({ firstName, userId, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// signup user
const signupUser = async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
