(function(module){
  var infoWindowTemplate = Handlebars.compile($('#infoWindow-template').html());
  
  maps = {};
  maps.geocoder = new google.maps.Geocoder();
  maps.googleMapEl = document.getElementById('google-map'); //placeholder name, need to be updated to be consistent with index
  maps.googleMap;
  maps.markerArray = [];
  maps.infoWindowArray = [];

  $googleMap = $('#google-map');//not sure if we need this or not

  maps.instantiateMap = function(mapProperties){
    console.log('maps.instantiateMap called');
    maps.googleMap = new google.maps.Map(maps.googleMapEl, mapProperties); //overwrites maps.googleMap to be the map itself once it's drawn
    maps.googleMap.set('styles', mapStyle);
  };

  //draws a single map marker on the specified point
  //markerPosition must be of type [lat, lng]
  //clearableFlag should be set to true for all markers corresponding to events and false for ones corresponding to user position
  //defaultOptions should be used to set the animation and custom appearance for any map markers
  //need to add a way to pass in the incident for the infoWindow
  maps.addMarker = function(markerPosition, clearableFlag, defaultOptions, incident){
    console.log('maps.addMarker called');
    var markerOptions = {};
    if (defaultOptions){
      markerOptions = defaultOptions;
    }
    markerOptions.position = new google.maps.LatLng(markerPosition[0], markerPosition[1]);
    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(maps.googleMap);
    
    if(incident){
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowTemplate(incident)
      });
      marker.addListener('click', function(){
        maps.infoWindowArray.forEach(function(currentMarker){
          currentMarker.close();
        });
        infoWindow.open(maps.googleMap, marker);
      });
      maps.infoWindowArray.push(infoWindow);
    }
    if (clearableFlag){
      maps.markerArray.push(marker);
    }
  };

  //needs to clear the map of all markers
  maps.clearMap = function(){
    console.log('maps.clearMap called');
    maps.markerArray.forEach(function(current){
      current.setMap(null);
    });
    maps.markerArray = [];
    maps.infoWindowArray = [];
  };

  //takes the google map, centers it on the user, then draws the markers where they need to go
  //centerPosition must be of type [lat, lng]
  maps.buildMap = function (centerPosition, mapPropertiesDefault) {
    console.log('maps.buildMap called');
    console.log('centerPosition is', centerPosition);
    var mapProperties = {};
    if (mapPropertiesDefault){
      mapProperties = mapPropertiesDefault;
    } else {
      mapProperties.zoom = 14;
    };
    mapProperties.mapTypeId = google.maps.MapTypeId.ROADMAP;
    if (centerPosition) { // a position was provided
      console.log('centerPosition is truthy, will build map centered on user');
      mapProperties.center = new google.maps.LatLng(centerPosition[0], centerPosition[1]);
      console.log('mapProperties is ', mapProperties);
      maps.instantiateMap(mapProperties);
    } else { //no position was provided
      console.log('centerPosition is falsy, will build map centered on Seattle');
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
  
  var mapStyle = [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#444444'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec'
        },
        {
          visibility: 'on'
        }
      ]
    }
  ];
  
  maps.userPositionMarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: {
      url: '/img/man.svg',
      scaledSize: new google.maps.Size(32,32),
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 1
    }
  };
  
  module.maps = maps;
})(window);
