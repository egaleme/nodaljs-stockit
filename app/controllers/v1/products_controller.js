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
        if (err) {
          return this.respond(err)
        }

        this.respond(models, ['id', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}]);

      });

    });

  }

  show() {

    this.authorize((err, accessToken, user) => {

      if (err) {
        return this.respond(err)
      }

      Product.query()
      .where({user_id__is: user.get('id')})
      .join('user')
      .where({id__is: this.params.route.id})
      .first((err, model) =>{
        if (err) {
          return this.respond(err)
        }
        this.respond(model,  ['id', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}])
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
      
        if (err) {
          return this.respond(err)
        }
        Product.query()
        .where({user_id: user.get("id")})
        .where({id: this.params.route.id})
        .update(this.params.body, (err, product) => {
          if (err) {
            return this.respond(err)
          }
          this.respond(product)
        })
        
        });
  }

 destroy() {
    this.authorize((err, accessToken, user) => {
      
        if (err) {
          return this.respond(err)
        }
        Product.query()
        .where({user_id: user.get('id')})
        .where({id: this.params.route.id})
        .first((err, product) => {
          if (err) {
            return this.respond(err)
          }
          product.destroy((err, item) => {
            this.respond(err || item)
          });
        });
        });
    }

}

module.exports = V1ProductsController;
