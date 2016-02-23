(function(module){

  overviewContent = {};

  var template = Handlebars.compile($('#incident-template').text());
  var render = function(incident){
    return template(incident);
  };


  overviewContent.index = function(){
    maps.buildMap([+overviewController.callBasicData.latitude, +overviewController.callBasicData.longitude]);
    maps.addMarker([+overviewController.callBasicData.latitude, +overviewController.callBasicData.longitude]);
  };

  resultsContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');
    Incident.all.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude]);
      $('#incidents-handlebars-here').append(render(thisIncident));
      // Talk about giving specific ID's, EX: Results Handlebars and Overview Handlebars.  Give both classes for styling.
    });
  };

  module.overviewContent = overviewContent;
})(window);
