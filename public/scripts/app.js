console.log("Sanity Check: JS is working!");

var template;
var $projectList;
var allProjects = [];

$(document).ready(function(){
  $projectList = $('#projectTarget');

  var source = $('project-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: onSuccess,
    error: onError
  });

  $("#newProjectForm").on("submit", function(el) {
    el.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/projects',
      data: $(this).serialize(),
      success: newProjectSuccess,
      error: newProjectError
    });
  });

  $projectsList.on("click", ".deleteBtn", function() {
    console.log("clicked delete button to ", '/api/projects' + $(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/projects/' + $(this).attr('data-id'),
      success: deleteProjectSuccess,
      error: deleteProjectError
    });
  });

});

function render () {
  $projectsList.empty();

  var projectHtml;

  allProjects.forEach(function(projectData) {
    projectHtml = template({project: projectData});

    $projectsList.append(projectHtml);
  });
}

function onSuccess(json) {
  allProjects = json;
  render();
}

function onError(json) {
  console.log('Error');
  $('#projectTarget').text('Failed to load projects');
}

function newProjectSuccess(json) {
  $('#newProjectForm input').val('');
  allProjects.push(json);
  render();
}

function newProjectError() {
  console.log("New Project Error");
}

function deleteProjectSuccess(json) {
  var project = json;
  console.log('deleted project ', project);
  var projectId = project._id;

  for(var i = 0; i < allProjects.length; i++) {
    if(allProjects[i]._id === projectId) {
      allProjects.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteProjectError() {
  console.log('Delete Project Error');
}
