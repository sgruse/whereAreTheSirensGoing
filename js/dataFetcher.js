(function (module){

  // var appToken = '0vBJ6JiStgBAfDkeAJf5h7645';
  var dataFetcher = {};

  dataFetcher.filterCodes = {
    violentCrimes: ['090', '091', '092', '040', '043', '049', '041', '026', '242', '249', '179', '010', '510', '291', '292', '330', '051', '052'],
    nonViolentCrimes: ['050', '053', '160', '161'],
    vehicleCrimes: ['071', '072', '074', '063', '061', '062'],
    sexCrimes: ['020', '021', '141', '142'],
    qualityOfLifeCrimes: ['130', '139','174', '176', '177', '080', '081', '082', '083', '084', '085', '086', '087', '243', '244', '245', '246', '170', '171', '220', '221', '181', '182', '183', '184', '450', '150', '151', '152', '125', '127']
  };

  //This builds the URL for the new API implementation on form changes
  dataFetcher.formatSpecificUrlForApi = function(parameterObj){
    console.log('dataFetcher.formatSpecificUrlForApi called');
    console.log('input parameterObj', parameterObj);
    // var formattedUrl = 'https://data.seattle.gov/resource/pu5n-trf4.json?';
    var formattedUrl = '/police/?';
    // formattedUrl ;
    formattedUrl += dataFetcher.formatEventClearanceWhereClause(parameterObj.codes, parameterObj.time);
    if (parameterObj.lat && parameterObj.lng){
      formattedUrl += ' AND within_circle(incident_location,'+ parameterObj.lat + ',' + parameterObj.lng + ',1000)'; //stretch goal: make the 10000 a variable passed in through the parameters so that it can be related to google maps zoom
    }
    formattedUrl += '&$order=event_clearance_date DESC';
    return formattedUrl;
  };
  
  
  //This builds a where clause to go in the api based on the acceptable police codes 
  dataFetcher.formatEventClearanceWhereClause = function(codeArray, whenString){
    console.log('dataFetcher.formatEventClearanceWhereClause called');
    return '$where=event_clearance_code in ("' + codeArray.join('", "') + '") AND event_clearance_date > "' + dataFetcher.formatDate(whenString) + '"';
  };
  
  //builds a date string of the form YEAR-MN-DY
  dataFetcher.formatDate = function(whenString){
    var dateObj = new Date();
    if (whenString === 'month'){
      dateObj = new Date(dateObj.getTime() - 2592000000);
    }
    return ([dateObj.getFullYear(), (dateObj.getMonth() + 1).toString(), dateObj.getDate().toString()]).map(function(current){
      if (current.length === 1){
        return '0' + current;
      } else {
        return current;
      }
    }).join('-');
  };  
  
  //makes the actual get requests using the url provided
  dataFetcher.makeAjaxCall = function(url, callback){
    console.log('dataFetcher.makeAjaxCall called');
    $.ajax({ 
      url: url,
      type: 'GET',
      ContentType: 'json',
      // headers: { 'X-App-Token': appToken },
      success: function(data, message, xhr){
        console.log(message);
        console.log('xhr is ', xhr);
        console.log('data is', data);
        callback(data);
      },
      error: function(){
        console.log('error receiveing data');
        callback();
      }
    });
  };

  //end result of this needs to be to store the data object somewhere
  dataFetcher.parseData = function(data){
    Incident.loadAll(data);
  };


  module.dataFetcher = dataFetcher;
})(window);
