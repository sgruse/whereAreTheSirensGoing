// draw objects onto map
//
// format objects into articles w/ handlebars
//
// VIEW - will compile handlebars,

(function(module){
  resultsContent = {};
  var template = Handlebars.compile($('#incident-template').text());

  resultsContent.render = function(incident) {
    return template(incident);
  };

  //this needs to do anything to draw the results page that happens before the police AJAX call comes back
  //notably, this needs to draw the google map centered at the user's position
  resultsContent.index = function() {
    console.log('resultsContent.index called');
    maps.buildMap([+resultsController.searchParams.lat, +resultsController.searchParams.lng]);
    maps.addMarker([+resultsController.searchParams.lat, +resultsController.searchParams.lng]);

  };

  resultsContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');
    Incident.all.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude]);
      $('#results-handlebars-here').append(resultsContent.render(thisIncident));
    });
  };



  module.resultsContent = resultsContent;
})(window);
