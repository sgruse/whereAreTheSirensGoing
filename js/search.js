(function(module){
  search = {};

  search.getUserLocation = function(){
    $('.ajax-loader').show();
    console.log('search.getUserLocation called');
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

  //if geolocation successfully detected
  search.geolocationSuccessCallback = function(results){
    $('.ajax-loader').hide();
    console.log('search.geolocationSuccessCallback called');
    console.log('results is', results);
    search.encodeUrl(search.formatLocation(results));
  };

  //this happens if we are denied permission to use their location, it's unavailable, or the request times out
  //will run if geolocation has error or if geolocation not supported
  search.geolocationErrorCallback = function(){
    console.log('search.geolocationErrorCallback called');
    console.log('error in navigator.geolocation.getCurrentPosition');
    indexContent.showIndexSearchBar();
    indexContent.attachIndexSearchBarListener();
    // search.makeSearchBarVisible();
    // search.attachSearchBarListener();
  };

  //this uses the google maps geocoding api to turn a search input into a LatLng pair, then it calls
  search.processSearchBarInput = function($searchBar){
    console.log('search.processSearchBarInput called');
    var addressToSearch = $searchBar.val();
    var formattedAddress =  addressToSearch;
    // var formattedAddress = addressToSearch.match() //not sure whether we will need to do any formatting of address or not
    maps.geocodeAddress(formattedAddress, function(results){
      search.encodeUrl(search.formatLocation(results));
    });
  };

  //make search bar do something when submitted
  //deprecated?
  search.attachSearchBarListener = function(){
    console.log('search.attachSearchBarListener called');
    $('#search-form').on('submit', function(event){
      event.preventDefault();
      search.processSearchBarInput();
    });
  };

  //navigator.geolocation does not return something similar to the google geocoder, so this will detect which one we were passed and format the data appropriately
  //returns an object to be used as the position for the center of a map
  search.formatLocation = function(results){
    console.log('search.formatSearchResults called');
    if (results instanceof Array){
      console.log('results was an array, receiving search results from google geocoder');
      var output = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      };
      console.log('output object to encode in url is ' + output);
      return output;
    } else if (results instanceof Object){
      console.log('results was just an object, receiving location from navigator.geolocation');
      var output = {
        lat: results.coords.latitude,
        lng: results.coords.longitude
      };
      console.log('output object to encode in url is ' + output);
      return output;
    } else {
      console.log('critical error in formatSearchResults, unrecognized input format');
    }
  };

  //encodes the url for the page call, then makes the page call
  search.encodeUrl = function(inputParametersObject){
    console.log('search.encodeUrl called');
    var url = '/results/';
    for (var key in inputParametersObject){
      url += '$' + key + ':' + inputParametersObject[key];
    }
    console.log('encoded url is');
    console.log(url);
    page(url);
  };


  module.search = search;
})(window);
