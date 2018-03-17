'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create_a_user = function (req, res) {
  var newUser = {
      username: req.body.username,
      password: req.body.password
  }
  var user = new User(newUser)
  if (user.role !== "DATA_MANAGER") {
    user.role = "USER"
  }
  user.save(function (err, user) {
      if (err) res.send(err);
      res.status(201).json(user);
  });
};
