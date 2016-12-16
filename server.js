// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/ryanthomas92/express-personal-api/README.md",
    baseUrl: "http://ryansapi.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My profile"},
      {method: "GET", path: "/api/projects", description: "Get all of my projects to date"},
      {method: "GET", path: "/api/projects/:id", description: "Get one project from the list of projects"},
      {method: "POST", path: "/api/projects", description: "Create a new project"},
      {method: "PATCH", path: "/api/projects/:id", description: "Places I've been and want to go to"},
      {method: "DELETE", path: "/api/projects/:id", description: "Deletes one of my projects"}
    ]
  });
});


app.get('/api/profile', function(req, res) {
  res.json({
    name: "Ryan Thomas",
    githubUsername: "ryanthomas92",
    githubLink: "https://github.com/ryanthomas92",
    githubProfileImage: "https://avatars0.githubusercontent.com/u/20100607?v=3&s=400",
    personalSiteLink: "https://ryansapi.herokuapp.com/",
    currentCity: "San Francisco",
    pets: [{name: "Snips", type: "Hermit Crab"}, {name: "Alpha", type: "Beta Fish"}]
  });
});

//get all projects
app.get('/api/projects', function(req, res) {
  db.Project.find({}, function(err, projects) {
    if(err) {
      return console.log("index error: " + err);
    } else {
      res.json(projects);
    }
  });
});

//get one project
app.get('/api/projects/:id', function (req, res) {
  db.Project.findOne({ _id: req.params.id }, function(err, foundProject) {
    if(err) {
      res.status(500).send("error: ", err);
    } else {
      res.json(foundProject);
    }
  });
});

//post one project
app.post('/api/projects', function projectCreate(req, res) {

  var projectInfo = {
    projectName: req.body.projectName,
    description: req.body.description,
    githubRepoUrl: req.body.githubRepoUrl //,
    // deployedUrl: req.body.deployedUrl,
    // screenshot: req.body.screenshot
  };

  var newProject = new db.Project(projectInfo);
  newProject.save(function(err, project) {
    if(err) {
      res.status(500).send('database error');
    } else {
      res.json(project);
    }
  });
});


// PATCH will update a specific project

app.patch('/api/projects/:id', function(req, res) {
  db.Project.findOne({ _id: req.params.id }, function(err, foundProject) {
    if(err) {
      res.status(500).send("error: ", err);
    } else {
      console.log("found project ", foundProject);
      foundProject.projectName = req.body.projectName;
      foundProject.description = req.body.description || foundProject.description;
      foundProject.githubRepoUrl = req.body.githubRepoUrl || foundProject.githubRepoUrl;

      // save modified project data
      foundProject.save(function(err, savedProject) {
        if (err) {
          res.status(500).send('database error');
        } else {
          res.json(foundProject);
        }
      })
    }
  });
});

//delete one projects
app.delete('/api/projects/:id', function(req, res) {
  var projectId = req.params.id;
  db.Project.findOneAndRemove({ _id: projectId }, function(err, deletedProject) {
    if(err) {
      res.status(500).send('database error');
    } else {
    res.json(deletedProject);
    }
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
