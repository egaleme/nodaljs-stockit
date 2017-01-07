'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');

class V1AccessTokensController extends Nodal.Controller {

 create() {
  AccessToken.login(this.params, (err, accessToken) =>{
    this.respond(err || accessToken)
  });
 }

 del() {
  AccessToken.logout(this.params, (err, accessToken) => {
    if (err) {
      return this.respond(err)
    }
    this.respond({done: "Token deleted"})
  });
 }

}

module.exports = V1AccessTokensController;
