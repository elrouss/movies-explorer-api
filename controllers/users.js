const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_SIGNING_KEY } = require('../utils/constants');

const User = require('../models/user');

function registerUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(201).send('Пользователь успешно зарегистрирован на сайте'))
    .catch((err) => console.log(err));
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? SECRET_SIGNING_KEY : 'dev-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      }
    })
    .catch((err) => console.log(err));
}

function getCurrentUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);
    })
    .catch((err) => console.log(err));
}

function setCurrentUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);
    })
    .catch((err) => console.log(err));
}

module.exports = {
  registerUser,
  loginUser,

  getCurrentUserInfo,
  setCurrentUserInfo,
};
