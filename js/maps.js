(function(module){
  maps = {};
  maps.geocoder = new google.maps.Geocoder();
  maps.googleMap = document.getElementById('#google-map'); //placeholder name, need to be updated to be consistent with index

  $googleMap = $('#google-map');//not sure if we need this or not

  maps.instantiateMap = function(mapProperties){
    console.log('maps.instantiateMap called');
    maps.googleMap = new google.maps.Map(maps.googleMap, mapProperties); //overwrites maps.googleMap to be the map itself once it's drawn
  };

  //draws a single map marker on the specified point
  maps.addMarker = function(markerPosition){
    console.log('maps.addMarker called');
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng()
    });
    marker.setMap(maps.googleMap);
  };

  //needs to clear the map of all markers
  maps.clearMap = function(){
    console.log('maps.clearMap called');

  };

  //takes the google map, centers it on the user, then draws the markers where they need to go
  maps.buildMap = function (centerPosition) {
    console.log('maps.buildMap called');
    console.log('centerPosition is', centerPosition);
    var mapProperties = {
      zoom:14,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    if (userPosition) { // a position was provided
      console.log('userPosition is truthy, will build map centered on user');
      mapProperties.center = centerPosition;
      maps.instantiateMap(mapProperties);
    } else { //no position was provided
      console.log('userPosition is falsy, will build map centered on Seattle');
      mapProperties.center = new google.maps.LatLng(47.61, -122.34);//centered some random place in seattle if no search term provided
      maps.instantiateMap(mapProperties);
    }
  };

  //takes an address as input and generates a latitude longitude pair as output for a callback
  maps.geocodeAddress = function(addressToGeocode, callback) {
    console.log('maps.geocodeAddress called');
    console.log('addressToGeocode is ' + addressToGeocode);
    maps.geocoder.geocode({'address': addressToGeocode}, function(results, status){
      console.log('geocoder results', results);
      console.log('geocoder status', status);
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('geocoder results are');
        console.log(results);
        callback(results);
      }
    });
  };

  module.maps = maps;
})(window);
