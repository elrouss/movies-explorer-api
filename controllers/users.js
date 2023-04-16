const User = require('../models/user');

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
  getCurrentUserInfo,
  setCurrentUserInfo,
};
