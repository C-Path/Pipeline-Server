'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    username: {
        type: String
    },
    project_name: {
        type: String
    },
    project_id: {
        type: String
    },
    name: {
        type: String,
        Required: 'Please enter'
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    completed_date: {
        type: Date
    }
})

module.exports = mongoose.model('Files', FileSchema)
