const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => {
    console.log('Соединение с MongoDB установлено');
  })
  .catch((err) => console.log(`Возникла ошибка при соединении с MongoDB: ${err}`));

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.listen(PORT, (err) => {
  err ? console.log(`В процессе соединения с портом возникла ошибка: ${err}`) : console.log(`Соединение с портом № ${PORT} успешно установлено`);
});
