// 格式化数据格式为jsonapi
'use strict';

function format(data) {
    var JSONAPISerializer = require('jsonapi-serializer').Serializer;
    var CategorySerializer = new JSONAPISerializer('categories', {
        attributes: ['id', 'userid', 'catgname',  'catgstatus', 'timestamp']
    });
    
    return CategorySerializer.serialize(data);
}

exports.format = format;

// user_id: String,  //方便查询冗余一个属性
// // catg_code: {type: String},
// catg_name: {type: String},
// timestamp: {type: Number},
// catg_status: {type: Number}, // 项目状态：1-正常；2-删除；3-过期
// todos: [{ref:'Todoitem', type: ObjectId}],
// user: {ref:'User', type: ObjectId}
