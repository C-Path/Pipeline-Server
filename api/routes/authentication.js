'user strict';

module.exports = function(app) {
  var mongoose = require('mongoose'),
      User = mongoose.model('User'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

  app.post('/authenticate', function (req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) res.send(err)
      if (user != null) {
          res.json({
            authenticated: true,
            token: req.body.token,
            role: user.role
          });
      } else {
        User.insertMany({username: req.body.username, password: req.body.token, role: "USER"}, function(err, user) {
          if (err) {
            res.json({"failure":"Failed creating user"})
          } else {
            res.json({
              authenticated: true,
              token: req.body.token,
              role: user.role
            });
          }
        })
      }
    })
  })

  function comparePassword (givenPass, user, cb) {
    bcrypt.compare(givenPass, user.password, function(err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch, user)
    })
  }
}
