(function(module){
  search = {};
  $searchBar = $('#search-bar');

  search.getUserLocation = function(){
    if (navigator.geolocation){
      console.log('navigator.geolocation supported by this browser');
      options = {enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(search.geolocationSuccessCallback, search.geolocationErrorCallback, options);
    } else {
      console.log('navigator.geolocation not supported');
      //need to ask them to input their address
      search.geolocationErrorCallback();
    }
  };

  search.geolocationSuccessCallback = function(userPosition){
    maps.buildInitialMap(userPosition);
  };

  //this happens if we are denied permission to use their location, it's unavailable, or the request times out
  //will need to run if geolocation has error or if geolocation not supported
  search.geolocationErrorCallback = function(){
    console.log('error in navigator.geolocation.getCurrentPosition');
    search.makeSearchBarVisible();
    search.attachSearchBarListener();
  };

  //this uses the google maps geocoding api to turn a search input into a LatLng pair, then it calls
  search.processSearchBarInput = function(){
    var addressToSearch = $searchBar.value();
  };

  //this is used to bring up the form on the index page so that they can search instead of having auto location detection
  search.makeSearchBarVisible = function(){

  };


  search.attachSearchBarListener = function(){

  };

  module.search = search;
})(window);
