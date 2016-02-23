(function(module){

  var resultsController = {};
  resultsController.searchParams;


  //takes search parameters in from the navbar to set the value of resultsController.searchParams which is used as implicit argument for all functions from here on
  resultsController.detectParameters = function(ctx, next){
    console.log('resultsController.detectParameters called');
    console.log('ctx is', ctx);
    console.log('ctx params are', ctx.params);
    resultsController.searchParams = ctx.params.parameters.match(/(\$[^\$\s]+:[^\$\s]+)/g).reduce(function(acc, current){
      var terms = current.replace('$', '').split(':');
      console.log('terms are ', terms);
      acc[terms[0]] = terms[1];
      return acc;
    }, {});
    console.log('resultsController.searchParams are', resultsController.searchParams);

    ctx.handled = true;
    next();
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



  module.resultsController = resultsController;
})(window);
