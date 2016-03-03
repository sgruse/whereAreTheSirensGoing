(function(module){
  indexContent = {};
  $searchFormNoAutodetect = $('#search-form-no-autodetect'); //should rename to index search bar


  // search.getUserLocation();

  indexContent.showIndexSearchBar = function() {
    $searchFormNoAutodetect.show();
  };

  indexContent.attachIndexSearchBarListener = function(){
    $searchFormNoAutodetect.on('submit', function(event){
      event.preventDefault();
      search.processSearchBarInput($('#main-address-input'));

    });
  };



  module.indexContent = indexContent;
})(window);
