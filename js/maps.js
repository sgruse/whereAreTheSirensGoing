(function(module){
  maps = {};
  maps.geocoder = new google.maps.Geocoder();
  maps.googleMap = document.getElementById('#google-map'); //need to update the id to be consistent with the index page

  $googleMap = $('#google-map');//not sure if we need this or not

  maps.buildInitialMap = function(mapProperties){
    maps.googleMap = new google.maps.Map(maps.googleMap, mapProperties); //overwrites maps.googleMap to be the map itself once it's drawn
  };

  //draws a single map marker on the specified point
  maps.addMarker= function(markerPosition){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng()
    });
    
  };

  //takes the google map, centers it on the user, then draws the markers where they need to go
  maps.setMapCenterAndMarkers = function (userPosition) {
    console.log('userPosition is', userPosition);
    var mapProperties = {
      zoom:14,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    if (userPosition) { // a position was provided
      console.log('userPosition is truthy, will build map centered on user');
      mapProperties.center = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude);

    } else { //no position was provided
      console.log('userPosition is falsy, will build map centered on Seattle');
      mapProperties.center = new google.maps.LatLng(47.61, -122.34);//centered some random place in seattle if no search term provided

    }
  };


  maps.geocodeAddress = function(addressToGeocode, callback) {
    maps.geocoder({'address': addressToGeocode}, function(results, status){
      console.log('geocoder results', results);
      console.log('geocoder status', status);
      if (status === google.maps.GeocoderStatus.OK) {
        callback(results);
      }
    });
  };

  module.maps = maps;
})(window);
