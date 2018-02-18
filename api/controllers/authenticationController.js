'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    bcrypt = require('bcrypt');

exports.create_a_user = function (req, res) {
  var user = new User(req.body)
  if (user.role !== "DATA_MANAGER") {
    user.role = "USER"
  }
  user.save(function (err, user) {
      if (err) res.send(err);
      res.json(user);
  });
};

exports.authenticate = function (req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) res.send(err)

    if (user != null) {
      comparePassword(req.body.password, user, function(err, isMatch, user) {
        if (err) res.send(err)
        const payload = {
          "username": user.username,
          "role": user.role,
        }

        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 Hours
        })
        res.json({
          authenticated: isMatch,
          token: token
        });
        })
    } else {
      res.json({"error": "User Not Found"})
    }
  })
}

function comparePassword (givenPass, user, cb) {
  bcrypt.compare(givenPass, user.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch, user)
  })
}
