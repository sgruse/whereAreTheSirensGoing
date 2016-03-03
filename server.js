var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

// var proxyPoliceApi = function(request, response) {
//   console.log('proxyPoliceApi called');
//   (requestProxy({
//     url: 'https://api.github.com/users/fraziermork',
//     headers: { Authorization: 'token ' + '0e0c238d0ebf6b96c53d0aa8fcb288c6adeaf4dd' }
//     // headers: {'X-App-Token': process.env.POLICE_TOKEN }
//   }))(request, response);
//   // response.send('hello');
// };
// 
// app.get('/police/*', proxyPoliceApi);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
