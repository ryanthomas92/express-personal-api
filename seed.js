This file allows us to seed our application with data
simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_project = {name: "Project 0", description: "First Project"}

db.Project.create(new_project, function(err, project){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new campsite", project._id)
  process.exit(); // we're all done! Exit the program.
})
