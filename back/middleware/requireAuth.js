const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers 

    if (!authorization) {
        return res.status(401).json({error: "authentication token required"})
    }

    // split the string webtoken which is authorization to the second part of the split the actual token
    const token = authorization.split('')[1]

    try {
        const { _id } = jwt.varify(token, process.env.SECRET) 
      
    // this makes sure that the user can access their workouts that they have created. Will just pass down the id and not the email or password.
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({error: 'request is not authorized'})
    }
   
}

module.exports = requireAuth