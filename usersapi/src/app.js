const express = require('express');
const app = express();
const port = process.env.port || 3000;
const connectDB = require('../config/db')

const mongoose = require('mongoose');

// 1. npm install express express-validator bcryptjs config gravitar jsonwebtoken mongoose request 
// 2. npm i -T nodemon concurrently (run express and react together)


//connect to  db
connectDB();

//init middleware for body parsing
app.use(express.json({extended : false}));

// Define routes
app.use('/api/users', require('../routes/api/users'));
app.use('/api/auth', require('../routes/api/auth'));
app.use('/api/posts', require('../routes/api/posts'));
app.use('/api/profile', require('../routes/api/profile'));

app.get('/', (req, res) => {
    res.send("API running");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});