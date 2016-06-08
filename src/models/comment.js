'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: {
    type: String
  },
  publicDate: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Comment', schema);
