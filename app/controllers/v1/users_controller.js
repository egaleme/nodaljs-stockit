'use strict';

const Nodal = require('nodal');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const User = Nodal.require('app/models/user.js');
const AccessToken = Nodal.require('app/models/access_token.js');

const AuthController = Nodal.require('app/controllers/auth_controller.js');

class V1UsersController extends AuthController {

  index() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      if (user.get('username') === 'admin') {

        User.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });
      } else {
        var error = new Error("Not Authorized");
        this.respond(error);
      }
      
    });

  }


  create() {
    if (!this.params.body.grant_type || this.params.body.grant_type !=="password") {
      var error = new Error("please supply grant_type")
      return this.respond(error);
    }
    User.create(this.params.body, (err, model) => {
      if (err) {
        return this.respond(err)
      }

     AccessToken.login(this.params, (err, accessToken) =>{
      if (err) {
        return this.respond(err)
      }
      var accessTokenValue = accessToken.get("access_token");
      
      var transporter = nodemailer.createTransport(
      smtpTransport('smtps://stockdiaryapp%40gmail.com:200owina07@smtp.gmail.com'));

      var email = this.params.body.email;

      // setup e-mail data with unicode symbols 
      var mailOptions = {
      from: '"StockIT" <stockdiaryapp@gmail.com>', 
      to: email, 
      subject: 'Your stockIT verification email', 
      html: `<h1>stockIT</h1>
             <p>Thanks for signing up with us</p>
             <p>Please click the link below to verify your email address</p>
             <a href="https://stockit-app.herokuapp.com/v1/verify_user?access_token=${accessTokenValue}>Verify address</a>` 
      };

      var self = this;
      // send mail with defined transport object 
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
          self.respond({message: "successfully created. please check your email and verify your account"})
      });         

    });

   });

  }

  update() {

    User.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      if (user.get('username') === 'admin') {

        User.destroy(this.params.route.id, (err, model) => {

         this.respond(err || model);

        });
      } else {
        var error = new Error("Not Authorized");
        this.respond(error);
      }   
    });

  }

}

module.exports = V1UsersController;
