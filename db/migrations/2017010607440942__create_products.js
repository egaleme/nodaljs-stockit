'use strict';

const Nodal = require('nodal');

class CreateProducts extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017010607440942;
  }

  up() {

    return [
      this.createTable("products", [{"name":"name","type":"string"},{"name":"batchno","type":"string"},{"name":"expiringdate","type":"string"},{"name":"price","type":"int"},{"name":"quantity","type":"int"},{"name":"user_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("products")
    ];

  }

}

module.exports = CreateProducts;
