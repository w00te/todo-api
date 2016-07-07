//Sequelize is an ORM library.
var Sequelize = require("Sequelize");
var sequelize = new Sequelize(undefined, undefined, undefined, {
  "dialect": "sqlite",
  "storage": __dirname + "/basic-sqlite-database.sqlite"
});

var Todo = sequelize.define("todo", {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 250]
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

sequelize.sync({
  //force: true
}).then(function() {
  console.log("Everything is synced.");

  Todo.findById(2).then(function(todo) {
    if (todo) console.log(todo.toJSON());
    else console.log("No todo found.");
  });

  /*
  Todo.create({
    description: "Walking the pot-belley pig..."
  }).then(function(todo) {
    return Todo.create({
      description: "Eat the soup."
    });
  }).then(function() {
    // Todo.findById(1);
    return Todo.findAll({
    	where: {
    		description: {
    			$like: "%pig%"
    		}
    	}
    });
  }).then(function(todo) {
    if (todo) {
    	//console.log("Looked up in database:", todo.toJSON());
    	console.log("\nItems looked up from database:");
    	todo.forEach(function(todo) {
    		console.log(todo.toJSON());
    	});
    }
    else {
    	console.log("No todo found.");
    }
  }).catch(function(e) {
    console.log(e);
  });
  */
});