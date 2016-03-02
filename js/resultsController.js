(function(module){
  var resultsController = {};
  resultsController.currentCodes = [];
  resultsController.searchParams; //maybe this is the best place to declare the initial general values for seattle? If that's the case though, they'll be overwritten as soon as a results call is made
  resultsController.filterTime = 'today';

  //
  resultsController.handleFilters = function() {
    console.log('resultsController.handleFilters called');
    var checkedBoxIndex = [];
    var $filter = $('#filter');
    resultsController.filterTime = $filter.find('.time-filter:checked').val();
    $filter.find('.type-filter:checked').each(function(){
      checkedBoxIndex.push($(this).attr('data-filterArrayIndex'));
    });
    var policeCodesArray = checkedBoxIndex.map(function(current){
      return dataFetcher.filterArray[current-1][2]; //switch to 0-4 on index
    });
    var flattenedPoliceCodesArray = policeCodesArray.reduce(function(prev, current, index, array){
      return prev.concat(current);
    },[]);
    console.log(flattenedPoliceCodesArray);
    resultsController.currentCodes = flattenedPoliceCodesArray;
    // dataFetcher.filterArray.filter(function(current, index, array){
    //   return checkedBoxID.indexOf(replace )
    // });
  };

  //runs whenever the filters form below the map is changed
  resultsController.onFormChange = function() {
    console.log('resultsController.onFormChange called');
    resultsController.handleFilters();
    maps.clearMap(); //need to redraw marker for user position
    var today = new Date();
    var monthAgo = new Date(today.getTime() - 2592000000);
    console.log(monthAgo);
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getYear();
    $('#results-handlebars-here').empty();
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
    $('body').css('background-color', 'white');
    $('.results').show();
    $('#results-header').show();
    $('#index').hide();
    $('#overview').hide();
    $('#map-holder').show();
    $('#overview-header').hide();
    $('header').css('border-bottom', '1px black solid');
    $('#show-filters').on('click', resultsController.showFilters);
    resultsContent.index();
    $('#filter').off();
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
