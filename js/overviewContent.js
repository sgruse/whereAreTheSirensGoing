(function(module){

  overviewContent = {};

  // var template = Handlebars.compile($('#incident-template').text());
  // var render = function(incident){
  //   return template(incident);
  // };

  var latitude1 = 47.61;
  var longitude1 = -122.34;


  overviewContent.index = function(){
    maps.buildMap([47.61, -122.34]);
    console.log('overviewContent.index was called');
  };

  overviewContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');

    var today = new Date().getDate();
    var filteredIncidents = Incident.all.filter(function(current){
      if (current.event_clearance_date){
        return today === new Date(current.event_clearance_date.replace('T', ' ')).getDate();
      } else {
        return false;
      }
    });
    filteredIncidents.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude], true);
      $('#overview-handlebars-here').append(resultsContent.render(thisIncident));
      // Talk about giving specific ID's, EX: Results Handlebars and Overview Handlebars.  Give both classes for styling.
    });
    $('#overview-handlebars-here li:nth-of-type(n+6)').hide();
  };

  $('#overviewReadOn').on('click', function(e){
    event.preventDefault();
    overviewContent.readOn();
  });


  overviewContent.readOn = function() {
    $('#overview-handlebars-here li:nth-of-type(n+6)').show();
    $('#overviewReadOn').hide();

  };

  module.overviewContent = overviewContent;
})(window);
