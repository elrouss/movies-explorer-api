const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const { MONGODB_URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use(router);

app.listen(PORT);
