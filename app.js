const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const errorHandler = require('./middlewares/errorHandler');

const connectDB = require('./config/dbConn');
//db connection
connectDB();

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", require('./routes/orders'));
app.use(errorHandler);

const port = process.env.PORT || 8080;

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`A node js API is listening in port : ${port}`)
    });
})