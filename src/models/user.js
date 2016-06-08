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


// var u = mongoose.model('User', schema);
// var o = new u({name:'test'});
// console.log(o);//{ name: 'test', _id: 5757d506378b018023bfc1aa, posts: [], comments: [] }

module.exports = mongoose.model('User', schema);
