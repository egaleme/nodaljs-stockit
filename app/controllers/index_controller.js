'use strict';

const Nodal = require('nodal');

class IndexController extends Nodal.Controller {

  get() {

    this.render('Welcome to StockIt Api Backend Service');

  }

}

module.exports = IndexController;
