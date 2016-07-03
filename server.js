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
  else res.status(404).send();	
});

app.delete("/todos/:id", function(req, res) {
  var toDoId = parseInt(req.params.id, 10);
  var deleteTarget = _.findWhere(todos, {id: toDoId});
  todos = _.without(todos, deleteTarget);
  if (deleteTarget) res.json(todos);
  else res.status(404).json({"error": "No to-do found with that id."});
});

app.put("/todos/:id", function(req, res) {

  var toDoId = parseInt(req.params.id, 10);
  var updateTarget = _.findWhere(todos, {id: toDoId});

  if (!updateTarget) return res.status(400).send();

  var body = _.pick(req.body, "description", "completed");
  var validAttributes = {};

  if (body.hasOwnProperty("completed") && _.isBoolean(body.completed)) {
  	validAttributes.completed = body.completed;
  }
  else if (body.hasOwnProperty("completed")) {
  	return res.status(400).send({"error" : "Completed was invalid."});
  }
  
  if (body.hasOwnProperty("description") && _.isString(body.description) && body.description.trim().length > 0) {
  	console.log("Setting description...");
  	validAttributes.description = body.description.trim();
  }
  else if (body.hasOwnProperty("description")) {
  	return res.status(400).send({"error" : "Description was invalid."});
  }

  updateTarget = _.extend(updateTarget, validAttributes);
  res.json(updateTarget);
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
