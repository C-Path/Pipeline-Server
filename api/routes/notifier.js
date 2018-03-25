'user strict';

module.exports = function(app) {
  var config = require("../../emailConfig"),
      nodemailer = require("nodemailer");

  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

  app.post('/requestAccount', function (req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass
      }
    })

    console.log("Sending email with...", req.body)

    var mailOptions = {
      from: config.user,
      to: 'isaac.c.lessard@gmail.com',
      subject: 'ReSeqTB Pipeline - New User Account Request',
      html: '<h1>New Account Request</h1><p>' + req.body.Username + ' has requested access to the CPath TB web portal.</p><a href="http://localhost:8080/newuser?email=' + req.body.Username + '"><button>Accept</button></a>'
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if (err)
        console.log("Error: ", err)
      else
        console.log("Email Sent: " + info.response)
        res.json({response: info.response})
    })
  })

  app.post('/sendEmail', function (req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass
      }
    })

    console.log("Sending email to... ", req.body.username)

    var mailOptions = {
      from: config.user,
      // to: req.body.username,
      to: 'isaac.c.lessard@gmail.com',
      subject: 'ReSeqTB Pipeline - ' + getSubject(),
      html: '<h1>Welcome</h1><p>That was easy!</p>'
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if (err)
        console.log(err)
      else
        console.log("Email Sent: " + info.response)
        res.json({response: info.response})
    })

    function getSubject() {
      // if (role == 'DATA_MANAGER') {
      //   return "Files Ready for Contribution"
      // } else {
      //   //TODO: logic for returning job status event instead of just complete
      //   return "Your Job Is Complete"
      // }
      return "Subject subject"
    }
  })
}
