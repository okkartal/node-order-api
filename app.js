const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();
//db connection
mongoose.connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true
        }
    )
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//bring in routes
const orderRoutes = require('./routes/orders');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", orderRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A node js API is listening in port : ${port}`)
});