// 格式化数据格式为jsonapi
'use strict';

function format(data) {
    var JSONAPISerializer = require('jsonapi-serializer').Serializer;
    var UserSerializer = new JSONAPISerializer('users', {
      attributes: ['id', 'email', 'password',  'usergrade', 'status', 'userprofile']
    });

    return UserSerializer.serialize(data);
}

exports.format = format;
