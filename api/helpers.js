'use strict';

var jwt = require('jsonwebtoken'),
    config = require('../config');

exports.getUsername = function (token) {
  var username = ""
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      console.log(err)
    } else {
      console.log('returning', decoded["username"])
      username = decoded["username"]
    }
  })
  return username
}
