(function(module) {
  indexController = {};
  var $indexMainButton = $('#index-main-button');
  var $indexSearchButton = $('#index-search-button');
  var $indexOverviewButton = $('#index-overview-button');

  indexController.index = function(){
    console.log('indexController.index called');
    $('header').css('border', 'none');
    $('#map-holder').hide();
    $('.results').hide();
    $('.overview').hide();
    $('#results-header').hide();
    $('#overview-header').hide();

    $indexMainButton.on('click', function(event){
      $indexMainButton.hide();
      search.getUserLocation();
    });

    $indexOverviewButton.on('click', function(event) {
      window.location = '/overview';
    });

    $indexSearchButton.on('click', function(event) {
      search.geolocationErrorCallback();
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
