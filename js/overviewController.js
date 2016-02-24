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
    $('#index').hide();
    $('#results').hide();
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
