var db = require('./models');

var project_list = [
  {
  name: "Project 0",
  description: "First Project"
  }
]
db Project.remove({}, function(err, projects) {
  if (err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log("Removed all projects");

    db.Project.create(projects_list, function(err, projects){
      if (err){ return console.log("Error:", err); }

      console.log("Created ", projects.length, " projects");
      process.exit(); // we're all done! Exit the program.
    });
  }
});
