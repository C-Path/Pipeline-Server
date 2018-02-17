var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Project = require('./api/models/projectsListModels'),
    User = require('./api/models/userModels')
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Projectdb');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var projectRoutes = require('./api/routes/projectsListRoutes');
var userRoutes = require('./api/routes/userRoutes');
projectRoutes(app);
userRoutes(app);

app.listen(port);

console.log("server started on: " + port);
