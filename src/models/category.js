'use strict';
var mongoose   = require('mongoose')
  , ObjectId   = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
  user_id: String,
  // catg_code: {type: String},
  catg_name: {type: String},
  timestamp: {type: Number},
  catg_status: {type: Number} // 项目状态：1-正常；2-删除；3-过期
});

module.exports = mongoose.model('Category', schema);
