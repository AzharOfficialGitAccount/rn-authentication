const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./models/User');
require('dotenv/config');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'auth-server',
    })
    .then(() => {
        console.log('Database Connected successfully');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', requireToken, (req, res) => {
    res.send({ email: req.user.email })
})

const Port = process.env.Port || 2021;
app.listen(Port, () => {
    console.log('server is running http://localhost:2021');
});
module.exports = app;