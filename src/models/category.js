'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  userid: {type: String},  //方便查询冗余一个属性
  // catgcode: {type: String},
  catgname: {type: String},
  timestamp: {type: Number},
  catgstatus: {type: Number}, // 项目状态：1-正常；2-删除；3-过期
  todos: [{ref:'Todoitem', type: ObjectId}],
  user: {ref:'User', type: ObjectId}
});

module.exports = mongoose.model('Category', schema);
