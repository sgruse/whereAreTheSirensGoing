//this controller will contain the functions needed to activate the filters and search bar in the map-holder on the results and overview pageview
//this will hold the controlling functions that should be shared between the results and overview pages
(function(module){
  mapHolderController = {};
  
  mapHolderController.currentCodesFilter = [];
  mapHolderController.currentTimeFilter = 'today';
  mapHolderController.searchParams = {};
  
  //detects which filters are checked and which aren't, then populates the right filters
  mapHolderController.populateCurrentCodesList = function(){
    mapHolderController.currentCodesFilter = [];
    var $filter = $('#filter');
    mapHolderController.currentTimeFilter = $filter.find('.time-filter:checked').val();
    $filter.find('.type-filter:checked').each(function(){
      mapHolderController.currentCodesFilter.push($(this).attr('data-codeTypes'));
    });
    return mapHolderController.currentCodes = mapHolderController.flattenArrays(mapHolderController.currentCodesFilter.map(function(current){
      return dataFetcher.filterCodes[current];
    }));
  };
  
  //takes an array of arrays and concatenates all of them
  mapHolderController.flattenArrays = function(inputArray){
    return inputArray.reduce(function(acc, current){
      return acc.concat(current);
    }, []);
  };
  
  //This is the new function that will be used for all API calls
  mapHolderController.fetchData = function(callback){
    var searchParams = {};
    searchParams.codes = mapHolderController.populateCurrentCodesList();
    if (mapHolderController.searchParams.lat && mapHolderController.searchParams.lng){
      searchParams.lat = mapHolderController.searchParams.lat;
      searchParams.lng = mapHolderController.searchParams.lng;
    }
    searchParams.time = mapHolderController.currentTimeFilter;
    var apiSearchUrl = dataFetcher.formatSpecificUrlForApi(searchParams);
    console.log('apiSearchUrl is', apiSearchUrl);
    dataFetcher.makeAjaxCall(apiSearchUrl, function(data){
      console.log(data);
      callback(data);
    });
  };
  
  mapHolderController.onFormChange = function(){
    mapHolderController.fetchData(function(data){
      maps.clearMap();
      $('#results-handlebars-here').empty();
      dataFetcher.parseData(data);
      resultsContent.renderArticlesAndMapMarkers(Incident.all);
    });
  };
  
  
  
  
  module.mapHolderController = mapHolderController;
})(window);
