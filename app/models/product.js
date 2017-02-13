'use strict';

const Nodal = require('nodal');

class Product extends Nodal.Model {}

Product.setDatabase(Nodal.require('db/main.js'));
Product.setSchema(Nodal.my.Schema.models.Product);
Product.validates('name', 'must be supplied', v => v);
Product.validates('batchno', 'must be supplied', v => v);
Product.validates('expiringdate', 'must be supplied', v => v);
Product.validates('quantity', 'must be supplied', v => v );
Product.validates('price', 'must be supplied', v => v );


module.exports = Product;
