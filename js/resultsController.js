(function(module){
  var resultsController = {};
  resultsController.searchParams; //maybe this is the best place to declare the initial general values for seattle? If that's the case though, they'll be overwritten as soon as a results call is made


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
    resultsContent.index();

    ctx.handled = true;
    next();
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
