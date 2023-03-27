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
router.get('/produce', getAllProduce)

// GET single produce item
router.get('/produce/:id', getProduceItem)

// POST a new produce
router.post('/produce', createProduceItem)

// UPDATE a produce item
router.put('/produce/:id', updateProduceItem)

// DELETE a produce item
router.delete('/produce/:id', deleteProduceItem)



module.exports = router