'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Projects');

exports.list_all_projects = function (req, res) {
    Project.find({
        "username": req.query.username
    }, function (err, projects) {
        if (err)
            res.send(err);
        res.json(projects);
    });
};

exports.create_a_project = function (req, res) {
    var new_project = new Project(req.body);

    new_project.save(function (err, project) {
        if (err)
            res.send(err);
        res.status(201).json(project);
    });
};

exports.read_a_project = function (req, res) {
    Project.findById(req.params.projectId, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.delete_project_by_id = function (req, res) {
    Project.find({"_id":req.params.projectId}).remove(function (err, result) {
        if (err)
            res.send(err);
        res.json({"Deleted": true});
    });
};
