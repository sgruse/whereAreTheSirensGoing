(function(module){

  overviewController = {};
  
  //this grabs the data that will initially be shown on the page 
  overviewController.fetchInitialData = function(ctx, next){
    console.log('overviewController.fetchInitialData called');
    mapHolderController.searchParams = {};
    mapHolderController.fetchData(function(data){
      if (data){
        dataFetcher.parseData(data);
        resultsContent.renderArticlesAndMapMarkers(Incident.all);
      }
      ctx.handled = true;
      next();
    });
    
  };

  
  overviewController.index = function(ctx, next){
    console.log('overviewController.index triggered successfully');
    $('#results-handlebars-here').empty();
    mapHolderController.hideAndShowAppropriate();
    $('#results-header').hide();
    $('#city-view-link').hide();
    $('#overview-header').show();
    $('#show-filters').on('click', resultsController.showFilters);
    mapHolderController.attachSearchBarListener();
    $('#filter').on('change', mapHolderController.onFormChange);
    overviewContent.index();
    console.log('overviewContent triggered successfully');
    ctx.handled = true;
    next();
  };
  
  module.overviewController = overviewController;
})(window);
