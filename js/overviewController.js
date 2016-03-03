(function(module){

  overviewController = {};
  
  //this grabs the data that will initially be shown on the page 
  overviewController.fetchInitialData = function(ctx, next){
    console.log('overviewController.fetchInitialData called');
    mapHolderController.searchParams = {};
    mapHolderController.fetchData(function(data){
      if (data){
        dataFetcher.parseData(data);
        overviewContent.renderArticlesAndMapMarkers(Incident.all);
      }
      ctx.handled = true;
      next();
    });
    
  };

  
  overviewController.index = function(ctx, next){
    console.log('overviewController.index triggered successfully');
    overviewController.hideAndShowAppropriate();
    $('#show-filters').on('click', resultsController.showFilters);
    $('#filter').on('change', mapHolderController.onFormChange);
    overviewContent.index();
    console.log('overviewContent triggered successfully');
    ctx.handled = true;
    next();
  };
  
  overviewController.hideAndShowAppropriate = function(){
    $('body').css('background-color', 'white');
    $('header').css('border-bottom', '1px black solid');
    $('#index').hide();
    $('#results').hide();
    $('#results-header').hide();
    $('#overview-header').show();
    $('#overview').show();
    $('#map-holder').show();
    $('#filter').off();
  };

  module.overviewController = overviewController;
})(window);
