'use strict';

const Nodal = require('nodal');
const AuthController = Nodal.require('app/controllers/auth_controller.js');
const User = Nodal.require('app/models/user.js');

class V1VerifyUserController extends AuthController {

  get() {
        this.authorize((accessToken, user) => {

        User.query()
        .where({id: user.get("id")})
        .first((err, model) => {
          model.set("email_verified", true)
          model.save((err, item) => {
            if (err) {
              return this.respond(err)
            }
            accessToken.destroy();
            this.render("account verified")
          })
          
        })
        
        });
    

  }


}

module.exports = V1VerifyUserController;
