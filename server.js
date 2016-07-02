var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("underscore");

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

//Refactored with underscore; finds single element where object matches.
app.get('/todos/:id', function(req, res) {
  var toDoId = parseInt(req.params.id, 10);
  var result = _.findWhere(todos, {id: toDoId});
  if (result) res.json(result);
  res.status(404).send();	
});

//By convention, creating an item in REST uses the same
//URL as the get-all URL, except that it is a post.
app.post('/todos', function(req, res) {

  var body = _.pick(req.body, "description", "completed");

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
  	return res.status(400).send();
  }

  body.description = body.description.trim();

  body["id"] = todoNextId++;
  todos.push(body);
  res.json(body);
});

app.listen(port, function() {
  console.log("Express listening on port " + port + "!")
});