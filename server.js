var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("TO-DO API Root");
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  var toDoId = req.params.id;
  for (var i = 0; i < todos.length; ++i) {
  	if (todos[i].id == req.params.id) {
  		res.json(todos[i]);
  		return;
  	}
  }
  res.status(404).send();	
});

//By convention, creating an item in REST uses the same
//URL as the get-all URL, except that it is a post.
app.post('/todos', function(req, res) {
  var body = req.body;
  body["id"] = todoNextId++;
  todos.push(body);
  console.log(todos);
  res.json(body);
});

app.listen(port, function() {
  console.log("Express listening on port " + port + "!")
});