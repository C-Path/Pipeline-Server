var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Project = require('./api/models/projectsListModels'),
    User = require('./api/models/userModels'),
    File = require('./api/models/fileModels'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Projectdb');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var projectRoutes = require('./api/routes/projectsListRoutes');
var userRoutes = require('./api/routes/userRoutes');
var fileRoutes = require('./api/routes/fileRoutes');
projectRoutes(app);
userRoutes(app);
fileRoutes(app);

app.use(function(req, res, next) {
  var token = req.body.token

  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({authenticated: false, message: 'Token authentication failed'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      authenticated: false,
      message: 'No token provided'
    })
  }
})

app.listen(port);

console.log("server started on: " + port);
