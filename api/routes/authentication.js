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

        comparePassword(req.body.password, user, function(err, isMatch, user) {
          if (err) res.send(err)
          const payload = {
            "username": user.username,
            "role": user.role,
          }

          var token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 60*60*24 // expires in 24 Hours
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
  })

  function comparePassword (givenPass, user, cb) {
    bcrypt.compare(givenPass, user.password, function(err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch, user)
    })
  }
}
