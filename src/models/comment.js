'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  name: {
    type: String
  },
  publicData: {
    type: Date
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Comment', schema);
