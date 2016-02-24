// draw objects onto map
//
// format objects into articles w/ handlebars
//
// VIEW - will compile handlebars,

(function(module){
  resultsContent = {};
  var template = Handlebars.compile($('#incident-template').text());

  var render = function(incident) {
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
      $('#results-handlebars-here').append(render(thisIncident));
    });
    $('<div/>', {
      'id':'myDiv',
      'class':'myClass',
      'style':'cursor:pointer;font-weight:bold;',
      'html':'<span id="readon">Display all Incidents >>></span>',
      'click':function(){ resultsContent.readOn(); },
      'mouseenter':function(){ $(this).css('color', 'red'); },
      'mouseleave':function(){ $(this).css('color', 'black'); }
    }).appendTo('.handlebars-goes-here');
    $('#results-handlebars-here li:nth-of-type(n+6)').hide();
  };
  resultsContent.readOn = function() {
    $('#results-handlebars-here li:nth-of-type(n+6)').show();
    $('#myDiv').hide();
  };


  module.resultsContent = resultsContent;
})(window);
