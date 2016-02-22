(function (module){

  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';
  var dataFetcher = {};

  dataFetcher.fetchData = function() {
    $.ajax({
        url: 'https://data.seattle.gov/resource/3k2p-39jp.json'
            //What to search for.
          + '?event_clearance_code=470'
            //Parameters of Search.
          + '&$order=event_clearance_date DESC',
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr){
        console.log(message);
        console.log(data);
      },
      error: function(){
        console.log('error recieveing data');
      }
    })
  };

  dataFetcher.parseData = function(){
    
  };

dataFetcher.fetchData();

  module.dataFetcher = dataFetcher;
})(window);
