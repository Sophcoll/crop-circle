const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method = cant use arrow functions must be a regular function otherwise the (this.) wont work
userSchema.statics.signup = async function (email, password) {
   
     // Validation - npm install validator - so email and password are valid
   
    if (!email || !password) {
        throw Error("All Fields must be Filled")
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    } 

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
   
   
    // check if email is in the database
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

   
    // Encrypting Password - npm install bcrypt -  to mask password, pass in argument the higher the number the longer it takes for hackers to get in and hack password, but also takes users longer for users to sign in. Default is 10
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // hash is the result of combining the users password and the random salt creation of hashing out the password. Now we add it to the database

    const user = await this.create({email, password: hash})

    return user
}

// static login method = cant use arrow functions must be a regular function otherwise the (this.) for the model wont work
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All Fields must be Filled")
    }

    // get the user
     const user = await this.findOne({ email })

    // if no user throw error
    if (!user) {
        throw Error('Incorrect email')
    }
    // now we compare to the hash verson - first is plain text with the hashed
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user

} 

module.exports = mongoose.model('User', userSchema)