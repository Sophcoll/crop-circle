const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const produceRoutes = require('./routes/produce')

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ------------------------------------------------------------------------------------


// routes
app.use('/produce', produceRoutes)

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb and listening on port:      ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })