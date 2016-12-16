var db = require('./models');

var projects_list = [
  {
  projectName: "Project 0",
  description: "First Project",
  githubRepoUrl: "https://github.com/ryanthomas92/project-0"
  }
]

db.Project.remove({}, function(err, queryResponse) {
  db.Project.create(projects_list, function(err, createdProject) {
    console.log("Created " + createdProject.length + " projects");
    process.exit();
  });
});
