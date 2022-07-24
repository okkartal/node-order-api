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

exports.getOrder = (req, res) => {
    Order.findOne({
            _id: req.params.id
        }).select("_id orderNumber quantity")
        .then((orders) => {
            res.json({
                orders
            })
        })
        .catch(err => console.log(err))
};

exports.createOrder = (req, res) => {
    Order.create(req.body)
        .then(order => {
            res.send(201, {
                order
            });
        })
        .catch(err => res.send(404, `An error occured while creating an order ${err}`))
}


exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                quantity: req.body.quantity
            }
        }, {
            upsert: true
        })
        .then(order => {
            res.send(204, {
                order
            });
        })
        .catch(err => res.send(404, `An error occured while updating an order ${err}`));
}

exports.deleteOrder = (req, res) => {
    Order.findOneAndRemove({
            _id: req.params.id
        })
        .then(result => {
            res.send(204, 'Order is deleted');
        })
        .catch(err => res.send(404, `An error occured while deleting an order ${err}`));
}