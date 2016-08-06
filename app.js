var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var port = 3000;
var dotenv = require('dotenv').config();
var api = process.env.API_PASS
var request = require('request');


function getImage(query){
  console.log(query)
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.post('/api/imagesearch', function(req,res){
  getImage(req.body)
})

var options = {
  url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=metallica&count=5',
  headers: {
    'Ocp-Apim-Subscription-Key': api
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(info.value[0].contentUrl)
    for(var i = 0; i < info.value.length; i ++){
      console.log(info.value[i].contentUrl)
    }
  }
}

request(options, callback);

app.listen(port,function(){
  console.log('listening port',port);
})
