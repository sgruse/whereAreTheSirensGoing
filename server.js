var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyPoliceApi = function(request, response) {
  console.log('proxyPoliceApi called');
  console.log('request.params are');
  console.dir(request);
  (requestProxy({
    url: 'https://data.seattle.gov/resource/pu5n-trf4.json', //?$where=event_clearance_date > "2015-03-02" AND within_circle(incident_location, 47.61, -122.34,1000)&$order=event_clearance_date DESC',
    query: request.query,
    // query: {
    //   $where: 'event_clearance_date > "2015-03-02" AND within_circle(incident_location, 47.61, -122.34,1000)',
    //   $order: 'event_clearance_date DESC'
    // },
    headers: {'X-App-Token': process.env.POLICE_TOKEN }
  }))(request, response);
};

var proxyTest = function(request, response) {
  console.log('proxyTest called');
  (requestProxy({
    url: 'https://api.github.com/users/fraziermork',
    headers: { Authorization: 'token ' + process.env.GH_TOKEN}
  }))(request, response);
};




app.get('/police/*', proxyPoliceApi);
app.get('/proxy-test', proxyTest);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
