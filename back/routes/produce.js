const express = require('express')

// import functions from controller folder
const {
    getAllProduce,
    getProduceItem,
    createProduceItem,
    updateProduceItem,
    deleteProduceItem
} = require('../controller/produceController')

const router = express.Router();

// GET all produce
router.get('/', getAllProduce)

// GET single produce item
router.get('/:id', getProduceItem)

// POST a new produce
router.post('/', createProduceItem)

// UPDATE a produce item
router.put('/:id', updateProduceItem)

// DELETE a produce item
router.delete('/:id', deleteProduceItem)



module.exports = router