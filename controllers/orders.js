const Order = require("../models/orders");

exports.getOrders = (req, res) => {
    Order.find().select("_id orderNumber quantity")
        .then((orders) => {
            res.json({
                orders
            })
        })
        .catch(err => console.log(err))
};

exports.createOrder = (req, res) => {
    const order = new Order(req.body);

    order.save().then(result => {
        res.json({
            order: result
        });
    })
}