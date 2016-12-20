# Ryan's API

### projectsList
* name
* description
* githubRepoUrl

## RESTful Routes(Endpoints)

Greice's API provides the following JSON endpoints:
* ```GET /api ``` Describes all available endpoints
* ```GET /api/profile ``` Author profile
* ```GET /api/projects``` Sends all projects as JSON
* ```GET /api/projects/:id``` Sends one specific project as JSON
* ```POST /api/projects``` Add a new project do the database
* ```PATCH /api/projects/:id``` Updates project attributes
* ```DELETE /api/projects/:id``` Deletes specific project
