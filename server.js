var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

var todos = [{
  id: 1,
  description: "Meet Augusta for lunch.",
  completed: false
}
,{
	id: 2,
	description: "Go to market.",
	complete: false
}
,{
	id: 3,
	description: "Go to work.",
	complete: true
}];

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

app.listen(port, function() {
  console.log("Express listening on port " + port + "!")
});