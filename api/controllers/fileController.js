'use strict';

var mongoose = require('mongoose'),
    File = mongoose.model('Files');

exports.list_all_files = function (req, res) {
    File.find({}, function (err, files) {
        if (err)
            res.send(err);
        res.json(files);
    });
};

exports.list_all_files_by_user = function (req, res) {
    File.find({
        "username": req.query.username
    }, function (err, files) {
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

exports.delete_old_files = function (req, res) {
    var date = new Date();
    var daysToDeletion = 30;
    var deletionDate = new Date(date.setDate(date.getDate() - daysToDeletion));
    File.deleteMany({
            $and: [{
                    "Created_date": {
                        $lt: deletionDate
                    }
                },
                {
                    "contribution": true
                },
                {
                    "approved": true
                }
            ]
        },
        function (err, resp) {
            if (err)
                res.send(err);
            res.json(resp);
        })
}