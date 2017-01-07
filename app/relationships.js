'use strict';

const Nodal = require('nodal');

/* Include this file to enable Model relationships */

/* For example...

  const Post = Nodal.require('app/models/post.js');
  const Comment = Nodal.require('app/models/comment.js');

  Comment.joinsTo(Post, {multiple: true});

*/
const Product = Nodal.require('app/models/product.js');
const User = Nodal.require('app/models/user.js');

Product.joinsTo(User, {multiple: true});
//User.joinedBy(Product, {multiple: true});

module.exports = {}; // Don't need to export anything
