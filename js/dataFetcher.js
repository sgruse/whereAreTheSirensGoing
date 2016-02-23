(function (module){

  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';
  var dataFetcher = {};

  //need to refactor this so that the part that takes parameters is less clumsy
  dataFetcher.fetchData = function() {
    console.log('dataFetcher.fetchData called');
    var latitude, longitude;
    if (resultsController.searchParams.length){
      latitude = resultsController.searchParams.lat;
      longitude = resultsController.searchParams.lng;
    } else {
      latitude = 47.61;
      longitude = -122.34;
    }
    console.log('latitude is ' + latitude);
    console.log('longitude is ' + longitude);
    $.ajax({
      url: 'https://data.seattle.gov/resource/3k2p-39jp.json' 
            //What to search for.
          + '?event_clearance_code=031'
            //Parameters of Search.
          + '&$order=event_clearance_date DESC'
          + '&$where=within_circle(incident_location,'+ latitude + ',' + longitude + ',10000)',
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr){
        console.log(message);
        console.log('xhr is ', xhr);
        console.log('data is', data);
        // console.log(data.length);
        // dataFetcher.parseData(data);
      },
      error: function(){
        console.log('error recieveing data');
      }
    });
  };

  dataFetcher.parseData = function(data){
    data.filter(function(el){
      // console.log(el.latitude);
      // console.log(el.event_clearance_group);
      // console.log(el);
    });
  };

  // dataFetcher.fetchData();

  module.dataFetcher = dataFetcher;
})(window);
