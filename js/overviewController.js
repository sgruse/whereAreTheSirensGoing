(function(module){

  overviewController = {};
  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';

  //code below could be refactored, using dataFetcher to make the ajax call
  //ctx is causing problems
  overviewController.callBasicData = function(ctx, next) {
    console.log('call basic data triggered successfully');

    var latitude = 47.61;
    var longitude = -122.34;

    $.ajax({
      url: 'https://data.seattle.gov/resource/3k2p-39jp.json'
          + '?$order=event_clearance_date DESC',
          // + 'where=within_circle(incident_location,' + latitude + ',' + longitude + ',10000)',
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr) {
        dataFetcher.parseData(data);
        console.log(data);
        ctx.handled = true;
        console.log(ctx);
        next();
      },
      error: function(){
        console.log('error in processing overviewController.callBasicData data');
        ctx.handled = true;
        next();
      }
    });
  };
//Could be placed in overviewContent
  overviewController.index = function(ctx, next){
    console.log('overviewController.index triggered successfully');
    $('#index').hide();
    // $('#results').hide();
    $('#overview').show();

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

  module.overviewController = overviewController;
})(window);
