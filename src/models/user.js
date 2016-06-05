'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: {
    type: String
    // required: true,
    // unique: true,
    // index: true
  },
  birth: { type: 'Date' },
  password: {
    type: String
  },
  addr: {
    type: String
  },
  comments: [{ref:'Comment', type: ObjectId}],
  posts: [{ref:'Post', type: ObjectId}]
});

module.exports = mongoose.model('User', schema);
