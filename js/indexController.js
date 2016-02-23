(function(module) {
  indexController = {};
  var $indexMainButton = $('#index-main-button');

  indexController.index = function(){
    console.log('indexController.index called');
    $('#search-bar').hide();
    $('#google-map').hide();
    $('.results').hide();
    $('.overview').hide();

    $indexMainButton.on('click', function(event){
      // event.preventDefault();
      $indexMainButton.hide();
      search.getUserLocation();
    });
  };

  indexController.onExit = function(ctx, next){
    $('#index-form-container').hide();
    ctx.handled = true;
    next();
  };
  // $('#addressSubmit').on('submit', function(event) {
  //   event.preventDefault();
  //   search.processSearchBarInput();
  // });

  module.indexController = indexController;
})(window);
