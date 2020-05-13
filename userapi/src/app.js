const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

console.log(__dirname);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.send("Hello, world !");
})

app.get('/users/all', (req, res) => {
    //res.send("Hello, world !");
    res.send('<h1>list all users</h1>');
})

app.get('/help', (req, res) => {
    const helpdata = [{
        title : "Help - US",
        contact : "1800-3249-7234"
    },
    {
        title : "Help - Global",
        contact : "1800-0000-7234"
    }];
    res.send(helpdata);
})

app.get('/user/:id', (req, res) => {
    //res.send("Hello, world !");
})

app.listen(3000, () => {
    console.log(`Application listening to port ${port}`);    
});