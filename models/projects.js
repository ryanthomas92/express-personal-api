var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  description: String,
  githubRepoUrl: String,
  deployedUrl: String,
  screenshot: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
