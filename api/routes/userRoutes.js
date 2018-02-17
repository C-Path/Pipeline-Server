'use strict';

module.exports = function (app) {
    var authentication = require('../controllers/authenticationController')

    /* Setting the headers allows for CORS so it will run normal locally */
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.route('/authenticate')
        .post(authentication.authenticate);

    app.route('/users')
      .post(authentication.create_a_user)

}
