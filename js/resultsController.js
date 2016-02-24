(function(module){
  var resultsController = {};
  resultsController.currentCodes = [];
  resultsController.searchParams; //maybe this is the best place to declare the initial general values for seattle? If that's the case though, they'll be overwritten as soon as a results call is made

  resultsController.handleFilters = function() {
    var checkedBoxIndex = []; $('#filter').find('.type-filter:checked').each(function(){
      checkedBoxIndex.push($(this).attr('data-filterArrayIndex'));
    });
    var checkedMap = checkedBoxIndex.map(function(current){
      return dataFetcher.filterArray[current-1][2];
    });
    var reducedMap = checkedMap.reduce(function(prev, current, index, array){
      return prev.concat(current);
    },[]);
    console.log(reducedMap);
    resultsController.currentCodes = reducedMap;
    // dataFetcher.filterArray.filter(function(current, index, array){
    //   return checkedBoxID.indexOf(replace )
    // });
  };
  resultsController.onFormChange = function() {
    resultsController.handleFilters();
    maps.clearMap();
    $('#results-handlebars-here').empty();
    var filteredIncidants = Incident.all.filter(function(current, index, array){
      return resultsController.currentCodes.indexOf(current.event_clearance_code) !== -1;
    });
    filteredIncidants.forEach(function(thisIncident){
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude]);
      $('#results-handlebars-here').append(resultsContent.render(thisIncident));
    });
  };
  //takes search parameters in from the navbar to set the value of resultsController.searchParams which is used as implicit argument for all functions from here on
  resultsController.detectParameters = function(ctx, next){
    console.log('resultsController.detectParameters called');
    console.log('ctx is', ctx);
    console.log('ctx params are', ctx.params);
    resultsController.searchParams = resultsController.pullPropertiesFromUrl(ctx);
    console.log('resultsController.searchParams are', resultsController.searchParams);

    ctx.handled = true;
    next();
  };

  //applies regular expression to the url to build the resultsController.searchParams object
  resultsController.pullPropertiesFromUrl = function(ctx){
    console.log('resultsController.pullPropertiesFromUrl  called');
    return ctx.params.parameters.match(/(\$[^\$\s]+:[^\$\s]+)/g).reduce(function(acc, current){
      var terms = current.replace('$', '').split(':');
      console.log('terms are ', terms);
      acc[terms[0]] = terms[1];
      return acc;
    }, {});
  };

  //will need to be redoce so it works whether you are coming initially from the index page/loading this url for the first time OR coming from results or overview already where the google map already exists
  resultsController.index = function(ctx, next){
    console.log('resultsController.index called');
    $('.results').show();
    $('#index').hide();
    $('#overview').hide();
    $('#google-map').show();
    $('#show-filters').on('click', resultsController.showFilters);
    resultsContent.index();
    $('#filter').on('change', resultsController.onFormChange);
    ctx.handled = true;
    next();
  };

  //need to refactor this so that the part that takes parameters is less clumsy
  resultsController.fetchData = function(ctx, next) {
    console.log('resultsController.fetchData  called');
    var formattedApiUrl = dataFetcher.formatUrlForApi(resultsController.searchParams);
    dataFetcher.makeAjaxCall(formattedApiUrl, function(data){
      if (data){
        dataFetcher.parseData(data);
      }
      ctx.handled = true;
      next();
    });
  };

  resultsController.showFilters = function(){
    $('#filter').slideToggle();
  };

  //this handles everything that still needs to happen after the ajax call to the police/fire api finishes
  resultsController.afterAjaxCall = function(ctx, next){
    console.log('resultsController.afterAjaxCall called');
    resultsContent.renderArticlesAndMapMarkers();

    ctx.handled = true;
    next();
  };

  //if they just go to /results, it should take them to the index page to enter a search
  resultsController.loadIndexPage = function(ctx, next){
    page('/');
    ctx.handled = true;
  };

  module.resultsController = resultsController;
})(window);
