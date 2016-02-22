(function (module){

  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';
  var dataFetcher = {};

  dataFetcher.fetchData = function() {
    $.ajax({
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json'
            //What to search for.
          + '?event_clearance_code=031'
            //Parameters of Search.
          + '&$order=event_clearance_date DESC',
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr){
        console.log(data);
        console.log(data.length);
        dataFetcher.parseData(data);
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

  dataFetcher.fetchData();

  module.dataFetcher = dataFetcher;
})(window);
