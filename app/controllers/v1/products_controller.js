'use strict';

const Nodal = require('nodal');
const Product = Nodal.require('app/models/product.js');
const Relationships = Nodal.require('app/relationships.js');
const AuthController = Nodal.require('app/controllers/auth_controller.js');

class V1ProductsController extends AuthController{

  index() {

    this.authorize((accessToken, user) => {

      if (!user.get("email_verified")) {
        var error  = new Error("please verify your email address")
        return this.respond(error)
      }

      Product.query()
      .where({user_id: user.get('id')})
      .join('user')
      .orderBy('created_at', 'DESC')
      .limit(this.params.query.offset, this.params.query.count)
      .end((err, models) => {
        if (err) {
          return this.respond(err)
        }

        this.respond(models, ['id', 'productid', 'name', 'batchno', 'expiringdate', 'price', 'quantity', 'created_at', {user: ['username']}]);

      });

    });

  }

  show() {

    this.authorize((accessToken, user) => {

       if (!user.get("email_verified")) {
        var error  = new Error("please verify your email address")
        return this.respond(error)
      }

      Product.query()
      .where({user_id__is: user.get('id')})
      .join('user')
      .where({productid: this.params.route.id})
      .first((err, model) =>{
        if (err) {
          return this.respond(err)
        }
        this.respond(model,  ['id', 'productid', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}])
      })
    });  

  }

  create() {
    this.authorize((accessToken, user) => {

        if (!user.get("email_verified")) {
        var error  = new Error("please verify your email address")
        return this.respond(error)
        }

        if (!this.params.body) {
          var error  = new Error("please supply all fields")
          return this.respond(error)
        }

        this.params.body.user_id = user.get('id');

        Product.create(this.params.body, (err, model) => {

        this.respond(err || model,  ['id', 'productid', 'name', 'batchno', 'expiringdate', 'price', 'quantity', {user: ['username']}]);

      });

    });

  }

  update() {
    this.authorize((accessToken, user) => {

        if (!user.get("email_verified")) {
        var error  = new Error("please verify your email address")
        return this.respond(error)
        }

        Product.query()
        .where({user_id: user.get("id")})
        .where({productid: this.params.route.id})
        .first((err, product) => {
          if (err) {
            return this.respond(err)
          }
          product.set("quantity", this.params.body.quantity)
          product.set("price", this.params.body.price)
          product.set("name", this.params.body.name)
          product.set("expiringdate", this.params.body.expiringdate)
          product.set("batchno", this.params.body.batchno)
          product.save((err, product) => {
            if (err) {
              return this.respond(err)
            }
            this.respond(product)
          });
        });
        
        });
  }

 destroy() {
    this.authorize((accessToken, user) => {
      
       if (!user.get("email_verified")) {
        var error  = new Error("please verify your email address")
        return this.respond(error)
        }
        
        Product.query()
        .where({user_id: user.get('id')})
        .where({productid: this.params.route.id})
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
