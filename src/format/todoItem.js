// 格式化数据格式为jsonapi
'use strict';

function format(data) {
    var JSONAPISerializer = require('jsonapi-serializer').Serializer;
    var TodoItemSerializer = new JSONAPISerializer('todoItems', {
        attributes: ['id', 'userid', 'title',  'checked', 'star',
         'timestamp', 'recordstatus', 'enddate', 'startdate', 'ispublish',
          'ischildorparent', 'childtodos', 'parenttodo', 'remark', 'user', 'category']
    });

    return TodoItemSerializer.serialize(data);
}

exports.format = format;
