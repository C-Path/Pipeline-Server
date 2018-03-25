'use strict';

module.exports = function (app) {
  var users = require('../controllers/usersController')

    /* Setting the headers allows for CORS so it will run normal locally */
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.route('/users')
      .post(users.create_a_user)

    app.route('/requestUser')
      .post(users.create_requested_user)

}
