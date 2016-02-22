// draw objects onto map
//
// format objects into articles w/ handlebars
//
// VIEW - will compile handlebars,

(function(module){

  resultsContent = {};

  var render = function(incident) {
    var template = Handlebars.compile($('#incident-template').text());

    return template(incident);
  };

  resultsContent.index = function(incidents) {
    $('#incidents-handlebars-here').show();
    $('#index').hide();
    $('#overview').hide();

    incidents.forEach(function(a) {
      $('#incidents-handlebars-here').append(render(a));
    });

    //any filter handlers will need to go here

  };

  module.resultsContent = resultsContent;
})(window);
