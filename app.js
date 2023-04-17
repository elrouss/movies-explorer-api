require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');

const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');

const { MONGODB_URL } = require('./utils/constants');

const { PORT } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
