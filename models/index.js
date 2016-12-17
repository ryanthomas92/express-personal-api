// require mongoose
var mongoose = require("mongoose");

// connect to database
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

// requires then exports the projects model
module.exports.Project = require("./projects.js");
