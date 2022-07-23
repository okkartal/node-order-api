const express = require('express');
const {
    getOrders,
    createOrder
} = require('../controllers/orders');
const validator = require('../validators');


const router = express.Router();

router.get("/", getOrders);
router.post("/", validator.createOrderValidator, createOrder);


module.exports = router;