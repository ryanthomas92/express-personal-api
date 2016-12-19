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
