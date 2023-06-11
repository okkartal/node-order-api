const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(
            process.env.MONGO_URI, {
                useNewUrlParser: true
            }
        )
        .then(() => console.log('DB Connected'))
        .catch(() => `An error occured while connecting to DB`)
}

module.exports = connectDB;