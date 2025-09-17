const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv-flow");

dotenv.config();

const viewRouter = require('./routes/view');
const paymentRouter = require('./routes/payment');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/views', viewRouter)
app.use('/payments', paymentRouter);

module.exports = app;
