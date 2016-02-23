(function(module){

  var resultsController = {};
  resultsController.searchParams;

  resultsController.index = function(){
    console.log('resultsController.index called');
  };

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



  module.resultsController = resultsController;
})(window);
