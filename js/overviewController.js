(function(module){

  overviewController = {};
  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';

  //code below could be refactored, using dataFetcher to make the ajax call
  //ctx is causing problems
  overviewController.callBasicData = function(ctx, next) {
    console.log('call basic data triggered successfully');
    var formattedApiUrl = dataFetcher.formatUrlForApi({});
    dataFetcher.makeAjaxCall(formattedApiUrl, function(data){
      if (data){
        dataFetcher.parseData(data);
      }
      ctx.handled = true;
      next();
    });
  };
//Could be placed in overviewContent
  overviewController.index = function(ctx, next){
    console.log('overviewController.index triggered successfully');
    $('body').css('background-color', 'white');
    $('header').css('border-bottom', '1px black solid');
    $('#index').hide();
    $('#results').hide();
    $('#results-header').hide();
    $('#overview-header').show();
    $('#overview').show();
    $('#map-holder').show();
    $('#filter').off();
    $('#filter').on('change', overviewController.onFormChange);
    overviewContent.index();
    console.log('overviewContent triggered successfully');
    ctx.handled = true;
    next();
  };

  overviewController.afterAjaxCall = function(ctx, next){
    console.log('overviewController.afterAjaxcall triggered successfully');
    overviewContent.renderArticlesAndMapMarkers();

    ctx.handled = true;
    next();
  };

  overviewController.onFormChange = function() {
    console.log('resultsController.onFormChange called');
    resultsController.handleFilters();
    maps.clearMap(); //need to redraw marker for user position
    var today = new Date();
    var monthAgo = new Date(today.getTime() - 2592000000);
    console.log(monthAgo);
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getYear();
    $('#overview-handlebars-here').empty();
    var filteredIncidants = Incident.all.filter(function(current, index, array){
      return resultsController.currentCodes.indexOf(current.event_clearance_code) !== -1;
    }).filter(function(current, index, array){
      if (resultsController.filterTime === 'today'){
        if (current.event_clearance_date){
          var thatDay = new Date(current.event_clearance_date.replace('T', ' '));
          return (day === thatDay.getDate() && month === thatDay.getMonth() && year === thatDay.getYear());
        } else {
          return false;
        }
      } else if (resultsController.filterTime === 'month'){
        console.log('month radio button checked');
        if (current.event_clearance_date){
          return new Date(current.event_clearance_date.replace('T', ' ')) > monthAgo;
        } else {
          return false;
        }
      } else {
        console.log('resultsController.filterTime has unrecognized format');
      }
    });
    console.log('filteredIncidants is ', filteredIncidants);
    filteredIncidants.forEach(function(thisIncident){
      maps.addMarker([+thisIncident.latitude, +thisIncident.longitude], true);
      $('#overview-handlebars-here').append(resultsContent.render(thisIncident));
    });
  };

  module.overviewController = overviewController;
})(window);
