const express = require('express')

// controller functions
const {signupUser, loginUser} = require('../controller/userController')

const router = express.Router()


// is this problem....if '/listings/:id' the id part is dynamic so adding ('/signup') will just add to the id???
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


module.exports = router