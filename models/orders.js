const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        mingLength: 4,
        maxLength: 150
    },
    quantity: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 100
    }
});

module.exports = mongoose.model("orders", orderSchema);