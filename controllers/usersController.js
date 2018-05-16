const mongoose = require("mongoose");
const Users = require("../models/users");

const sendAllUsers = (req, res, next) => {
  Users.find()
    .then(users => {
      res.send({ users });
    })
    .catch(err => {
      if (err) next(err);
    });
};

const sendUserById = (req, res, next) => {
  const { user_id } = req.params;
  Users.findById(user_id)
    .then(user => {
      res.send({ user });
    })
    .catch(err => {
      if (err.name === "CastError") next({ status: 404 });
      else next(err);
    });
};

module.exports = { sendAllUsers, sendUserById };
