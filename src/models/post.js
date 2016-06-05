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
  },
  comments: [{ref:'Comment', type: ObjectId}]
});

module.exports = mongoose.model('Post', schema);
