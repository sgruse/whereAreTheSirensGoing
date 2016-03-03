(function(module){
  var resultsController = {};
  resultsController.currentCodes = [];
  resultsController.searchParams; //maybe this is the best place to declare the initial general values for seattle? If that's the case though, they'll be overwritten as soon as a results call is made
  resultsController.filterTime = 'today';
  
  //takes search parameters in from the navbar to set the value of mapHolderController.searchParams which is used as implicit argument for all functions from here on
  resultsController.detectParameters = function(ctx, next){
    console.log('resultsController.detectParameters called');
    console.log('ctx is', ctx);
    console.log('ctx params are', ctx.params);
    mapHolderController.searchParams = resultsController.pullPropertiesFromUrl(ctx);
    console.log('mapHolderController.searchParams are', mapHolderController.searchParams);

    ctx.handled = true;
    next();
  };

  //applies regular expression to the url to build the mapHolderController.searchParams object
  resultsController.pullPropertiesFromUrl = function(ctx){
    console.log('resultsController.pullPropertiesFromUrl  called');
    return ctx.params.parameters.match(/(\$[^\$\s]+:[^\$\s]+)/g).reduce(function(acc, current){
      var terms = current.replace('$', '').split(':');
      console.log('terms are ', terms);
      acc[terms[0]] = terms[1];
      return acc;
    }, {});
  };

  //will need to be reduce so it works whether you are coming initially from the index page/loading this url for the first time OR coming from results or overview already where the google map already exists
  resultsController.index = function(ctx, next){
    $('#results-handlebars-here').empty();
    console.log('resultsController.index called');
    mapHolderController.hideAndShowAppropriate();
    $('#results-header').show();
    $('#overview-header').hide();
    $('#show-filters').on('click', resultsController.showFilters);
    mapHolderController.attachSearchBarListener();
    resultsContent.index();
    $('#filter').off();
    $('#filter').on('change', mapHolderController.onFormChange);
    ctx.handled = true;
    next();
  };

  //need to refactor this so that the part that takes parameters is less clumsy
  resultsController.fetchInitialData = function(ctx, next) {
    console.log('resultsController.fetchInitialData called');
    mapHolderController.fetchData(function(data){
      if (data){
        dataFetcher.parseData(data);
        resultsContent.renderArticlesAndMapMarkers(Incident.all);
      } else {
        alert('error');
      }
      ctx.handled = true;
      next();
    });
  };


  resultsController.showFilters = function(){
    $('#filter').slideToggle();
  };

  //if they just go to /results, it should take them to the index page to enter a search
  resultsController.loadIndexPage = function(ctx, next){
    page('/');
    ctx.handled = true;
  };

  module.resultsController = resultsController;
})(window);
