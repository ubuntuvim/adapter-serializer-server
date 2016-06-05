# adapter-serializer-server

Emberjs适配器和序列化器示例的后端处理程序。
数据库是[Mongodb](https://mongodb.org)，数据格式处理使用[node json-api](https://github.com/ethanresnick/json-api)。

1. Clone the repo
2. Run `npm install`
3. Ensure MongoDB is running and listening on the default port
4. Run `node src/index.js`
5. Try out the following (for example):
  - `GET http://localhost:3000/` to view the auto-generated documentation
  - `GET http://localhost:3000/people` to view the people collection
  - `POST http://localhost:3000/schools` to add a school
  - `GET http://localhost:3000/organizations` to view the organizations collection, which includes all schools too
  - `GET http://localhost:3000/people/{id}` to view a person, after it's been created
  - `GET`, `POST`, or `PATCH` `http://localhost:3000/organizations/{id}/relationships/liaisons` to view or modify an organization's `liaisons` relationship
