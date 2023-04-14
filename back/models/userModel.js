const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//-----------------------------------------------------------------------------
// STATIC SIGNUP METHOD

// cant use arrow functions must be a regular function otherwise the (this.) wont work
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  //VALIDATION
  // check all required fields are filled in
  // Validation - npm install validator - so email and password are valid
  if (!firstName || !lastName || !email || !password) {
    throw Error('All Fields must be Filled');
  }
  // next we can use validator to check whether the email entered, is in fact an email
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  // next we check if the password is strong enough, using validators 'isStrongPassword' method
  if (!validator.isStrongPassword(password)) {
    throw Error('Must contain 8 characters, 1 symbol and 1 uppercase');
  }

  // CHECKING FOR EXISTING ENTRY
  // check if email is in the database
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  // Encrypting Password - npm install bcrypt -  to mask password, pass in argument the higher the number the longer it takes for hackers to get in and hack password, but also takes users longer for users to sign in. Default is 10
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // hash is the result of combining the users password and the random salt creation of hashing out the password. Now we add it to the database

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

//-----------------------------------------------------------------------------
// STATIC LOGIN METHOD
// cant use arrow functions must be a regular function otherwise the (this.) for the model wont work

userSchema.statics.login = async function (email, password) {
  //VALIDATION
  // check all required fields are filled in
  if (!email || !password) {
    throw Error('All Fields must be Filled');
  }

  // CHECKING FOR DATABASE FOR MATCHING EMAIL
  // get the user
  const user = await this.findOne({ email });

  // if no user throw error
  if (!user) {
    throw Error('Incorrect email');
  }

  // CHECKING FOR PASSWORD MATCH
  // now we compare to the hash verson - first is plain text with the hashed
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
