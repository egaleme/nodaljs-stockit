'use strict';

const Nodal = require('nodal');

class Users extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017012613263454;
  }

  up() {

    return [
      this.addColumn("users","email_verified","boolean", {"defaultValue": false})
    ];

  }

  down() {

    return [
        this.dropColumn("users","email_verified")
    ];

  }

}

module.exports = Users;
