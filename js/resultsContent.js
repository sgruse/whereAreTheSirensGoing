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
    userPositionMarkerOptions = maps.userPositionMarkerOptions;
    maps.buildMap([+mapHolderController.searchParams.lat, +mapHolderController.searchParams.lng]);
    maps.addMarker([+mapHolderController.searchParams.lat, +mapHolderController.searchParams.lng], false, userPositionMarkerOptions);
  };

  //this builds the articles and map markers for both the overview and results pages
  resultsContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');
    var $resultsHandlebarsHere = $('#results-handlebars-here');
    $resultsHandlebarsHere.empty();
    incidents.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude], true, {}, thisIncident);
      $resultsHandlebarsHere.append(resultsContent.render(thisIncident));
    });
    resultsContent.attachReadOnListenerAndHide();
  };

  
  resultsContent.attachReadOnListenerAndHide = function(){
    $('#results-handlebars-here li:nth-of-type(n+6)').hide();
    $('#resultsReadOn').on('click', function(e){
      event.preventDefault();
      resultsContent.readOn();
    });
  };


  resultsContent.readOn = function() {
    $('#results-handlebars-here li:nth-of-type(n+6)').show();
    $('#resultsReadOn').hide();
  };


  module.resultsContent = resultsContent;
})(window);
