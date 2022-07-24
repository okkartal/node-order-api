exports.createOrderValidator = (req, res, next) => {

    //orderNumber
    req.check("orderNumber", "Write an order number").notEmpty();
    req.check("orderNumber", "Order number must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });

    //Quantity
    req.check("quantity", "Write a quantity").notEmpty();
    req.check("quantity", "Quantity must be between 1 to 100").isLength({
        min: 1,
        max: 100
    });

    //check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }

    //proceed to next middleware
    next();
}

exports.updateOrderValidator = (req, res, next) => {


    //Quantity
    req.check("quantity", "Write a quantity").notEmpty();
    req.check("quantity", "Quantity must be between 1 to 100").isLength({
        min: 1,
        max: 100
    });

    //check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }

    //proceed to next middleware
    next();

}