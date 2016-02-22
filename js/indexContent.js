(function(module){
  indexContent = {};

  $('#search-bar').hide();
  $('.results').hide();
  $('.overview').hide();
  search.getUserLocation();

  indexContent.showSearchBar = function() {
    $('#search-bar').show();
  };

  module.indexContent = indexContent;
})(window);
