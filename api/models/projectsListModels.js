'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
        Required: 'Please enter'
    },
    active: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Projects', ProjectSchema)