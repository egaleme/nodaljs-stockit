'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

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
        this.respond({error: "Not Authorized"})
      }
      
    });

  }


  create() {

    User.create(this.params.body, (err, model) => {

      this.respond(err || model);

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
        this.respond({error: "Not Authorized"})
      }   
    });

  }

}

module.exports = V1UsersController;
