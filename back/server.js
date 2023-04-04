const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// routes
const listingRoutes = require('./routes/listing')
const userRoutes = require('./routes/user')
// const commentsRoutes = require('./routes/comments')

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("images"));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



// ------------------------------------------------------------------------------------

// routes
app.use('/listings', listingRoutes)
app.use('/user', userRoutes)
// app.use('/comments', commentsRoutes)



// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb and listening on port:      ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })