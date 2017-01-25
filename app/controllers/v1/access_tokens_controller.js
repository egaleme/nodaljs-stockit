'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');
const Relationships = Nodal.require('app/relationships.js');

class V1AccessTokensController extends Nodal.Controller {

 create() {
  AccessToken.login(this.params, (err, accessToken) =>{
  	if (err) {
  		return this.respond(err)
  	}
   AccessToken.query()
	.where({access_token: accessToken.get('access_token')})
	.join('user__products')
	.end((err, accessToken) => {
		this.respond(err ||accessToken, ['id', 'access_token', {user: ['id','username', 'products']}])
	});
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
