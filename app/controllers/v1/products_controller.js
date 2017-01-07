'use strict';

const Nodal = require('nodal');
const Product = Nodal.require('app/models/product.js');
const Relationships = Nodal.require('app/relationships.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');

class V1ProductsController extends AuthController{

  index() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      Product.query()
      .where({user_id: user.get('id')})
      .join('user')
      .end((err, models) => {

        this.respond(err || models, ['id', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}]);

      });

    });

  }

  show() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      Product.query()
      .where({user_id: user.get('id')})
      .join('user')
      .where({id: this.params.route.id})
      .end((err, model) =>{
        this.respond(err || model,  ['id', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}])
      })
    });  

  }

  create() {
    this.authorize((err, accessToken, user) => {

        if (err) {
          return this.respond(err);
        }

        this.params.body.user_id = user.get('id');
        Product.create(this.params.body, (err, model) => {

        this.respond(err || model,  ['id', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}]);

      });

    });

  }

  update() {

    this.authorize((err, accessToken, user) => {
      var userid = user.get('id');
      
        if (err) {
          return this.respond(err);
        }

        Product.update(this.params.route.id, this.params.body, (err, model) => {

          this.respond(err || model);

        });

    });

  }

  destroy() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      Product.destroy(this.params.route.id, (err, model) => {

        this.respond({done: "Product deleted"});

      });

    }); 

  }

}

module.exports = V1ProductsController;
