'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  title: {
    type: String
  },
  publicDate: {
    type: Date
  },
  content: {
    type: String
  },
  flag: {
    type: Boolean
  }
});

module.exports = mongoose.model('Comment', schema);
