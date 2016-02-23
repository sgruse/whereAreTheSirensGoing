(function(module){
  overviewController = {};

  //code below could be refactored, using dataFetcher to make the ajax call
  overviewController.callBasicData = function() {

    var latitude = 47.61;
    var longitude = -122.34;

    $.ajax({
      url: 'https://data.seattle.gov/resource/3k2p-39jp.json'
          + '?$order=event_clearance_date DESC'
          + 'where=within_circle(incident_location,' + latitude + ',' + longitude + ',10000)',
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr) {
        dataFetcher.parseData(data);
        ctx.handled = true;
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
    $('#overview').show();
    $('#index').hide();
    $('#results').hide();

    overviewContent.index();
    ctx.handled = true;
    next();
  };

  overviewController.afterAjaxCall = function(ctx, next){
    overviewContent.renderArticlesAndMapMarkers();

    ctx.handled = true;
    next();
  };

  module.overviewController = overviewController;
})(window);
