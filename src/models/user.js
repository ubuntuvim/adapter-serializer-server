'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  nickname: {
    type: String
  },
  email: {
      type: 'String',
      required: true,
      unique: true,
      index: true
  },
  password: {
    type: String
  },
  createdate: {
    type: Date
  },
  usergrade: { type: Number },  //用户等级，暂时用不上预留
  status: { type: Boolean },
  userprofile: { type: String },  //用户头像
  // comments: [{ref:'Comment', type: ObjectId}],
  todos: [{ref:'Todoitem', type: ObjectId}],
  categorys: [{ref:'Category', type: ObjectId}]
});


module.exports = mongoose.model('User', schema);
