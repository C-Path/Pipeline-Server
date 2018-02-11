'use strict';

module.exports = function (app) {
    var projectList = require('../controllers/projectsListControllers')

    app.route('/projects')
        .get(projectList.list_all_projects)
        .post(projectList.create_a_project);

    app.route('projects/:projectId')
        .get(projectList.read_a_project);
}