const Produce = require('../models/produceModel')
const mongoose = require('mongoose');



// GET all produce items, sorted by newest created
const getAllProduce = async (req, res) => {
    const produce = await Produce.find({}).sort({ createdAt: -1 })
    res.status(200).json(produce)
}

// GET a single produce item
const getProduceItem = async () => { }

// POST a new produce item
const createProduceItem = async () => { }

// UPDATE a produce item
const updateProduceItem = async () => { }

// DELETE a single produce item
const deleteProduceItem = async () => { }


// export functions to controller
module.exports = {
    getAllProduce,
    getProduceItem,
    createProduceItem,
    updateProduceItem,
    deleteProduceItem
}