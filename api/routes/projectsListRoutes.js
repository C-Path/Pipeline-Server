'use strict';

module.exports = function (app) {
    var projectList = require('../controllers/projectsListControllers')

    /* Setting the headers allows for CORS so it will run normal locally */
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.route('/projects')
        .get(projectList.list_all_projects)
        .post(projectList.create_a_project);

    app.route('projects/:projectId')
        .get(projectList.read_a_project);
}