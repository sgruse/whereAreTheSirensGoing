var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyPoliceApi = function(request, response) {
  console.log('proxyPoliceApi called');
  console.log('request.params are');
  console.dir(request);
  (requestProxy({
    url: 'https://data.seattle.gov/resource/pu5n-trf4.json',
    query: request.query,
    headers: {'X-App-Token': process.env.POLICE_TOKEN }
  }))(request, response);
};

app.get('/police/*', proxyPoliceApi);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
