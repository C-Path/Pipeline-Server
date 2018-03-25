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

exports.create_requested_user = function (req, res) {
  var generatedPass = Math.random().toString(36).substring(7)
  var newUser = {
      username: req.body.params.email,
      password: generatedPass,
      role: "USER"
  }
  
  User.find({username: req.body.params.email}, function (err, users) {
      if (err)
          res.send(err);
      if (users.length < 1) {
        var user = new User(newUser)
        user.save(function (err, user) {
            if (err) res.send(err);
            res.status(201).json(user);
        });
      } else {
        res.json({"errors": {}, "message": "Email already exists"})
      }
  });
}
