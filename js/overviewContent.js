(function(module){

  overviewContent = {};

  var template = Handlebars.compile($('#incident-template').text());
  var render = function(incident){
    return template(incident);
  };

  var latitude1 = 47.61;
  var longitude1 = -122.34;


  overviewContent.index = function(){
    maps.buildMap([47.61, -122.34]);
    maps.addMarker([47.61, -122.34]);
    console.log('overviewContent.index was called');
  };

  overviewContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');
    Incident.all.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude]);
      $('#overview-handlebars-here').append(render(thisIncident));
      // Talk about giving specific ID's, EX: Results Handlebars and Overview Handlebars.  Give both classes for styling.
    });
  };

  module.overviewContent = overviewContent;
})(window);
