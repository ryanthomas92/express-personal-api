// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// make a schema
var ProjectSchema = new Schema({
  projectName: String,
  description: String,
  githubRepoUrl: String //,
  // deployedUrl: String,
  // screenshot: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
