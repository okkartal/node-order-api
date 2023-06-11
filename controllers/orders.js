const Order = require("../models/orders");

exports.getOrders = (req, res) => {
    Order.find().select("_id orderNumber quantity")
        .then((orders) => {
            res.status(200).json({
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
            res.status(200).json({
                orders
            })
        })
        .catch(err => console.log(err))
};

exports.createOrder = async (req, res) => {

    const {
        orderNumber,
        quantity
    } = req.body;

    if (!orderNumber || !quantity) return res.status(400).json({
        'message': 'orderNumber and quantity are required'
    });

    //check for duplicate
    const duplicate = await Order.findOne({
        orderNumber: orderNumber
    });

    if (duplicate) {
        return res.status(400).json({
            'message': `This orderNumber : ${orderNumber}  in use`
        });
    }

    Order.create(req.body)
        .then(order => {
            res.status(201).json(order);
        })
        .catch(err => res.send(404).json({
            'message': `An error occured while creating an order ${err}`
        }))
}


exports.updateOrder = async (req, res) => {

    Order.findOneAndUpdate({
            _id: req.body.id
        }, {
            $set: {
                quantity: req.body.quantity
            }
        }, {
            upsert: true
        })
        .then(result => {
            res.status(204).json(result)
        })
        .catch(err => res.send(404).json({
            'message': `An error occured while updating an order ${err}`
        }));
}

exports.deleteOrder = (req, res) => {

    return Order.findOneAndRemove({
            _id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                'message': 'Order is deleted'
            });
        })
        .catch(err => res.status(404).json({
            'message': `An error occured while deleting an order ${err}`
        }));
}