'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Projects'),
    helpers = require('../helpers.js');

exports.list_all_projects = function (req, res) {
    Project.find({
        "username": helpers.getUsername(req.query.token)
    }, {username: 0, active: 0, Created_date: 0}, function (err, projects) {
        if (err)
            res.send(err);
        res.json(projects);
    });
};

exports.create_a_project = function (req, res) {
    var new_project = new Project(req.body);
    new_project.username = helpers.getUsername(req.query.token)

    new_project.save(function (err, project) {
        if (err)
            res.send(err);
        res.status(201).json({name: project.name, description: project.description});
    });
};

exports.read_a_project = function (req, res) {
    Project.findById(req.params.projectId, {username: 0, active: 0, Created_date: 0}, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.delete_project_by_id = function (req, res) {
    Project.findById(req.params.projectId, function (err, project) {
        if (err)
            res.send(err);
        if(project.username == helpers.getUsername(req.query.token)) {
          Project.remove(project, function (err, result) {
            if (err)
                res.send(err);
            res.json({"Deleted": true});
          })
        } else {
          res.json({"message": "Authentication failed: user does not have access to delete"})
        }
  });
};
