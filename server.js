var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Project = require('./api/models/projectsListModels'),
    User = require('./api/models/userModels'),
    File = require('./api/models/fileModels'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./config')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Projectdb');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('secret', config.secret);

var authentication = require('./api/routes/authentication')
authentication(app)

app.use(function(req, res, next) {
  if (req.url === '/authenticate') return next();

  var token = (req.body.token || req.query.token || req.headers['x-access-token'])

  if (token) {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({authenticated: false, message: 'Token authentication failed'})
      } else {
        return next()
      }
    })
    // return next()
  } else {
    return res.status(403).send({
      authenticated: false,
      message: 'No token provided'
    })
  }
})

var projectRoutes = require('./api/routes/projectsListRoutes');
var userRoutes = require('./api/routes/userRoutes');
var fileRoutes = require('./api/routes/fileRoutes');
projectRoutes(app);
userRoutes(app);
fileRoutes(app);

app.listen(port);

console.log("server started on: " + port);
