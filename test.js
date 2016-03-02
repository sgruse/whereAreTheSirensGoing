var requestProxy = require('express-request-proxy'),
  express = require('express'),
  app = express();

requestProxy({
  url: 'https://api.github.com/users/fraziermork',
  headers: { Authorization: 'token ' + '0e0c238d0ebf6b96c53d0aa8fcb288c6adeaf4dd' }
  // headers: {'X-App-Token': process.env.POLICE_TOKEN }
}, function(err, data){
  console.log(data);
});
