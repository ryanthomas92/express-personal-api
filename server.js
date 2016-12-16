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

// var db = require('./models');

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
      {method: "GET", path: "/api/projects", description: "All of my projects to date"},
      {method: "POST", path: "/api/projects", description: "Create a new project"},
      {method: "GET", path: "/api/places", description: "Places I've been and want to go to"}
    ]
  })
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

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
