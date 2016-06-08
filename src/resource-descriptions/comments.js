module.exports = {

  urlTemplates: {
    "self": "http://127.0.0.1:3000/comments/{id}",
    "relationship": "http://127.0.0.1:3000/comments/{ownerId}/relationships/{path}"
  },
  beforeRender: function(resource, req, res, superFn) {
  	console.log('resource = ' + resource);
  	for (var i in resource) {
  		console.log(resource[i]);
  	}
    return resource;
  }
}
