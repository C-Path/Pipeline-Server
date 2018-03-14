'user strict';

module.exports = function (app) {
  var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken');

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/authenticate', function (req, res) {
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      if (err) res.send(err)
      if (user != undefined) {
        comparePassword(req.body.password, user, function (err, isMatch, user) {
          if (err) res.send(err)
          if (user != undefined) {
            const payload = {
              "username": user.username,
              "role": user.role,
            }
            var token = jwt.sign(payload, app.get('secret'))

            res.json({
              authenticated: isMatch,
              token: token
            });
          }
        })
      } else {
        res.json({
          "error": "User Not Found"
        })
      }
    })
  })

  function comparePassword(givenPass, user, cb) {
    if (givenPass === user.password) {
      cb(null, true, user)
    } else {
      cb("passwords do not match")
    }
  }
}