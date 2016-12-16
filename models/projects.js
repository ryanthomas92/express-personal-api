var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  type: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
