'use strict';

var mongoose = require('mongoose'),
    File = mongoose.model('Files');

exports.list_all_files = function (req, res) {
    File.find({"username":req.query.username}, function (err, files) {
        if (err)
            res.send(err);
        res.json(files);
    });
};

exports.create_a_file = function (req, res) {
    var new_file = new File(req.body);

    new_file.save(function (err, file) {
        if (err)
            res.send(err);
        res.json(file);
    });
};
