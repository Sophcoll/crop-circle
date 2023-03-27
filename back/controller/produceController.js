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
const createProduceItem = async (req, res) => { 
    const { name, exchange, image, location, pickup, description, message } = req.body
    
    try {
        const produce = await Produce.create({ name, exchange, image, location, pickup, description, message })
        res.status(200).json(produce)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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