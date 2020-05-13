const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongouri');

const connectdb = async () => {
    try {
        // below wil return a promise
        // mongoose.connect(db);
        await mongoose.connect(db, { useNewUrlParser: true , useCreateIndex: true});
        console.log('Mongo DB Connected.');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectdb;