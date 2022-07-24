const express = require('express');
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');
const validator = require('../validators/index');


const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", validator.createOrderValidator, createOrder);
router.put("/:id", validator.updateOrderValidator, updateOrder);
router.delete("/:id", deleteOrder);


module.exports = router;