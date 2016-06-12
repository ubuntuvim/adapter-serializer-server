'use strict';
var path     = require('path')
  , express  = require('express')
  , API      = require('json-api')
  , APIError = API.types.Error
  , mongoose = require('mongoose');

// Start by loading up all our mongoose models and connecting.
mongoose.connect('mongodb://mg.ddlisting.com/ddlisting');

var OrganizationModelSchema = require('./models/organization')
  , OrganizationModel       = OrganizationModelSchema.model
  , OrganizationSchema      = OrganizationModelSchema.schema;

var models = {
  Person: require('./models/person'),
  Organization: OrganizationModel,
  School: require('./models/school')(OrganizationModel, OrganizationSchema),
  User: require('./models/user'),
  Post: require('./models/post'),
  Comment: require('./models/comment'),
  Category: require('./models/category'),
  Todoitem: require('./models/todoItem'),
}

// And registering them with the json-api library.
// Below, we load up every resource type and give each the same adapter; in
// theory, though, different types could be powered by different dbs/adapters.
// Check /resource-desciptions/school.js to see some of the advanced features.
var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  people: require('./resource-descriptions/people'),
  organizations: require('./resource-descriptions/organizations'),
  schools: require('./resource-descriptions/schools'),
  users: require('./resource-descriptions/users'),
  posts: require('./resource-descriptions/posts'),
  comments: require('./resource-descriptions/comments'),
  categories: require('./resource-descriptions/categories'),
  todoItems: require('./resource-descriptions/todoItems')
}, { dbAdapter: adapter });

var Controller = new API.controllers.API(registry);

// Initialize the automatic documentation.
var Docs = new API.controllers.Documentation(registry, {name: 'Example API'});

// Initialize the express app + front controller.
var app = express();

var Front = new API.httpStrategies.Express(Controller, Docs);
var apiReqHandler = Front.apiRequest.bind(Front);

// 跨域请求问题，否则post请求会转为OPTIONS请求，不能保存数据
var cors = require('cors');
app.use(cors());

// POST请求参数解析
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Enable CORS. Note: if you copy this code into production, you may want to
// disable this. See https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Method', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Header', 'X-Requested-With, Content-Type');
  next();
})

// http请求日志
var morgan = require('morgan');
// morgan('combined');
app.use(morgan('method=> :method url=> :url response-time=> :response-time'));

// Now, add the routes.
// To do this in a more scalable and configurable way, check out
// http://github.com/ethanresnick/express-simple-router. To protect some
// routes, check out http://github.com/ethanresnick/express-simple-firewall.
app.get("/", Front.docsRequest.bind(Front));

// app.route("/:type(people|organizations|schools)")
//   .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
// app.route("/:type(people|organizations|schools)/:id")
//   .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
// app.route("/:type(people|organizations|schools)/:id/relationships/:relationship")
//   .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

// 登录
app.post('/login', function (req, res, next) {
  // 如果是根据email查询的先执行
  var email = req.body.email;
  console.log('email ==== ' + req.body.email);
  console.log('password ==== ' + req.body.password);
  if (email) {
      var user = require('./models/user');
      var userFormat = require('./format/user');
      var queryParams = null;
      if (req.query.password) {
          queryParams = { email: email, password: req.body.password };
      } else {
          queryParams = { email: email };
      }
      var ret = user.find(queryParams, function(err, docs) {
          res.send(userFormat.format(docs));
      });
  } else {
      res.send(200);
    // next();  //继续执行后面的路由处理
  }
});

// user
// 自定义处理：  GET /users?email=tomster@example.com&password=xxx
app.get('/users', function (req, res, next) {
  // 如果是根据email查询的先执行
  var email = req.query.email;
  if (email) {
      var user = require('./models/user');
      var userFormat = require('./format/user');
      var queryParams = null;
      if (req.query.password) {
          queryParams = { email: email, password: req.query.password };
      } else {
          queryParams = { email: email };
      }
      var ret = user.find(queryParams, function(err, docs) {
          res.send(userFormat.format(docs));
      });
  } else {
    //   res.send(null);
    next();  //继续执行后面的路由处理
  }
});

initRoute("/:type(users)/:id");
initRoute("/:type(users)");

// comments
initRoute("/:type(comments)");
initRoute("/:type(comments)/:id");

// category
app.get('/categories', function (req, res, next) {
  // 如果是根据userId查询的先执行
  var userId = req.query.userid;
  var catgstatus = req.query.catgstatus;
  if (userId || catgstatus) {
      var category = require('./models/category');
      var categoryFormat = require('./format/category');
      var queryParams = { userid: userId, catgstatus: catgstatus };
      var ret = category.find(queryParams, function(err, docs) {
          if (err)
            throw err;

            console.log('docs',docs);
            res.send(categoryFormat.format(docs));
      });
  } else {
    //   res.send(null);
    next();  //继续执行后面的路由处理
  }
});
initRoute("/:type(categories)");
initRoute("/:type(categories)/:id");

// todoItem
app.get('/todoItems', function (req, res, next) {
  // 如果是根据userId查询的先执行
  var userId = req.query.userid;
  var recordstatus = req.query.recordstatus;
  if (userId || recordstatus) {
      var todoItem = require('./models/todoItem');
      var todoItemFormat = require('./format/todoItem');
      var queryParams = { userid: userId, recordstatus: recordstatus };
      var ret = todoItem.find(queryParams, function(err, docs) {
          if (err)
            throw err;
            console.log('docs',docs);
          res.send(todoItemFormat.format(docs));
      });
  } else {
    //   res.send(null);
    next();  //继续执行后面的路由处理
  }
});
initRoute("/:type(todoItems)");
initRoute("/:type(todoItems)/:id");

// app.use(function(req, res, next) {
//     // 获取客户端传递过来的请求头信息
//     console.log('API_KEY == ' + req.get('API_KEY'));
//     console.log('ANOTHER_HEADER == ' + req.get('ANOTHER_HEADER'));
//     // 其他处理……
//     next();
// });

// api/v1/user
// app.route("/api/v1/:type(users|user)")
//     .get(apiReqHandler)
//     .post(apiReqHandler)
//     .patch(apiReqHandler)
//     .delete(apiReqHandler);
// // api/v1/user?id=xxx
// app.route("/api/v1/:type(users|user)/:id")
//     .get(apiReqHandler)
//     .post(apiReqHandler)
//     .patch(apiReqHandler)
//     .delete(apiReqHandler);

// 客户端发送的请求都不匹配签名的路由则提示不存在
app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});

// And we're done! Start 'er up!
console.log('Starting up! Visit 127.0.0.1:3000 to see the docs.');
app.listen(3000);

// URL请求前缀
function initRoute(url) {
    var urlPrifix = "";
    app.route(urlPrifix + url)
        .post(apiReqHandler)
        .get(apiReqHandler)
        .patch(apiReqHandler)
        .delete(apiReqHandler);
}
function getRequest(url) {
    var urlPrifix = "";
    app.route(urlPrifix + url).get(apiReqHandler);
}
