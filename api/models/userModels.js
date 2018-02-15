'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const SALT_NUM = 10;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_NUM, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash;
      next()
    })
  })
})

UserSchema.methods.comparePassword = function(givenPass, cb) {
  bcrypt.compare(givenPass, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
