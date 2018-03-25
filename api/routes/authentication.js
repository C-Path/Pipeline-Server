'user strict';

module.exports = function (app) {
  var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../../config');

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

          const payload = {
            "username": user.username,
            "role": user.role,
            aud: "pipeline.reseqtb.org",
            iss: "pipeline-test.reseqtb.org",
            exp: "10h",
          }


          var cert = fs.readFileSync('../../certs/jwtClient.key');

          var token = jwt.sign(payload, cert, { algorithm: 'RS256'})

          //TEST key
          var pubCert = fs.readFileSynce('../../certs/jwtClient.key.pub');
          jwt.verify(token, pubCert, function (err, decoded) {
            console.log("DECO: ", decoded)
          })

          res.json({
            authenticated: isMatch,
            token: token
          });
        })
      } else {
        res.json({
          "error": "User Not Found"
        })
      }
    })
  })

  function comparePassword(givenPass, user, cb) {
    bcrypt.compare(givenPass, user.password, function(err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch, user)
    })
  }
}
