(function (module){

  var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';
  var dataFetcher = {};
  dataFetcher.filterArray = [['#violent-crimes', 'Violent Crimes', ['090', '091', '092', '040', '043', '049', '041', '026', '242', '249', '179', '010', '510', '291', '292', '330', '051', '052']],['#non-violent','Non-Violent Crimes',['050', '053', '160', '161']],['#sex-crimes','Sex Crimes',['020', '021', '141', '142']],['#vehicle','Auto Crimes',['071', '072', '074', '063', '061', '062']],['#quality','Quality of Life',['130', '139','174', '176', '177', '080', '081', '082', '083', '084', '085', '086', '087', '243', '244', '245', '246', '170', '171', '220', '221', '181', '182', '183', '184', '450', '150', '151', '152', '125', '127']]];

  dataFetcher.handleFilters = function(allIncidents){

  };
  
  //need to refactor this so that the part that takes parameters is less clumsy
  dataFetcher.fetchData = function(ctx, next) {
    console.log('dataFetcher.fetchData called');
    var latitude, longitude;
    if (Object.keys(resultsController.searchParams).length){
      latitude = resultsController.searchParams.lat;
      longitude = resultsController.searchParams.lng;
    } else { //setting latitude and longitude clumsily to these if somehow we called this and the lat and lng parameters weren't present in the url
      latitude = 47.61;
      longitude = -122.34;
    }
    console.log('latitude is ' + latitude);
    console.log('longitude is ' + longitude);
    $.ajax({ //need to figure out how to add any other queries from url, like the filters
      url: 'https://data.seattle.gov/resource/pu5n-trf4.json'
            //What to search for.
          + "?$where=event_clearance_code not in ('NULL','008','009','010','011','012','013','014','015','016','017','018','019','020','021','022','023','024','025','026','027','311','312','313','314','390','391','030','031','032','033','034','035','036','040','050','341','342','343','344','345','346','320','321','322','323','324','347','510','520','271','273','274','275','371','372','373','470','481','465','415')"//needs to be changed so that this only appears if they specify a type of code to filter by
            //Parameters of Search.
          + '&$order=event_clearance_date DESC',
          // + '&$where=within_circle(incident_location,'+ latitude + ',' + longitude + ',10000)', need to make the radius a function of the google map zoom level
      type: 'GET',
      ContentType: 'json',
      headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr){
        console.log(message);
        console.log('xhr is ', xhr);
        console.log('data is', data);

        // console.log(data.length);
        dataFetcher.parseData(data);
        ctx.handled = true;
        next();
      },
      error: function(){
        console.log('error receiveing data');
        ctx.handled = true;
        next();
      }
    });
  };

  //end result of this needs to be to store the data object somewhere
  dataFetcher.parseData = function(data){
    Incident.loadAll(data);
    // data.filter(function(el){
      // console.log(el.latitude);
      // console.log(el.event_clearance_group);
      // console.log(el);
    // });
  };

  // dataFetcher.fetchData();

  module.dataFetcher = dataFetcher;
})(window);
