(function(module){

  overviewContent = {};

  overviewContent.index = function(){
    maps.buildMap(null, {zoom: 10});
    console.log('overviewContent.index was called');
  };


  overviewContent.renderArticlesAndMapMarkers = function(incidents){
    console.log('resultsContent.renderArticlesAndMapMarkers called');
    var $overviewHandlebarsHere = $('#overview-handlebars-here');
    $overviewHandlebarsHere.empty();
    incidents.forEach(function(thisIncident) {
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude], true);
      $overviewHandlebarsHere.append(resultsContent.render(thisIncident));
    });
    
    // overviewContent.attachReadOnListenerAndHide();
  };

  
  overviewContent.attachReadOnListenerAndHide = function(){
    $('#overview-handlebars-here li:nth-of-type(n+6)').hide();
    $('#overviewReadOn').on('click', function(e){
      event.preventDefault();
      overviewContent.readOn();
    });  
  };


  overviewContent.readOn = function() {
    $('#overview-handlebars-here li:nth-of-type(n+6)').show();
    $('#overviewReadOn').hide();
  };

  module.overviewContent = overviewContent;
})(window);
