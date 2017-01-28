'use strict';

const Nodal = require('nodal');

class CreateUsers extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017010509432397;
  }

  up() {

    return [
      this.createTable("users", [{"name":"email","type":"string","properties":{"unique":true}},{"name":"password","type":"string"},{"name":"username","type":"string", "properties":{"unique":true}}])
    ];

  }

  down() {

    return [
      this.dropTable("users")
    ];

  }

}

module.exports = CreateUsers;
