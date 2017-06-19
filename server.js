// server.js
// where your node app starts

// init project
var express = require('express');
var randomstring = require('randomstring');
var app = express();


var urls = {};
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// https://rainbow-step.glitch.me/new/https://www.google.com
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// :url//:web.:name.|\::end
// https:\/\/(www.)?(\w+.|:)(\w+)


// https?:\/\/\w+\.\w+(.\w+|:\d)+

app.get('/new/:url(https?:\/\/[a-z]+\.?[a-z]+\.[a-z]+)', function (request, response) {
  var longUrl = request.params.url;
  var shortUrl = randomstring.generate({ charset: 'alphanumeric', length: 6});
  urls[shortUrl] = longUrl;
  response.send({longUrl, shortUrl});
});

app.get('/go/:shortUrl', function(request, response) {
  if(!urls[request.params.shortUrl]) return response.send('The short url used is not registered');
  console.log(urls);
  response.redirect(urls[request.params.shortUrl]);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
