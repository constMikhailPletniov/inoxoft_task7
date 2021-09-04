/* eslint-disable func-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-params */

const express = require('express');

require('dotenv').config();

const { PORT, DB_MONGO, InternalServerError } = require('./config/conf.js');
const { authRouter, userRouter, pestRouter } = require('./router');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(DB_MONGO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pest', pestRouter);
// eslint-disable-next-line no-use-before-define
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`Port ${PORT} working...`)
});

// eslint-disable-next-line func-style
// eslint-disable-next-line space-before-function-paren
// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || InternalServerError).json({
        message: err.message || 'Unknown Error'
    })
}


