var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var port = 3000;
var dotenv = require('dotenv').config();
var api = process.env.API_PASS
var request = require('request');
var mongoose = require('mongoose')
var Result = require('./models/Result.model');
var Latest = require('./models/Latest.model')
var db = 'mongodb://localhost/imageapi'

mongoose.connect(db)

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.post('/api/imagesearch', function(req,res){
  function getImage(requestUser){
    var options = {
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' +
      requestUser.query + '&count='+  requestUser.count +'&offset=' +
      requestUser.offset,
      headers: {
        'Ocp-Apim-Subscription-Key': api
      }
    };
    return request(options, callback);
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      storeData(info.value)
    }
  }

  function storeData(imageResults){
    //lets save the results and the search history query in database
    for(var i = 0; i < imageResults.length; i++){
      var newResult = new Result();
      newResult.contentUrl = imageResults[i].contentUrl;
      newResult.altText = imageResults[i].name;
      newResult.pageUrl = imageResults[i].hostPageUrl;

      newResult.save(function(err,data){
        if (err) throw console.error(err);
        else{
          console.log(data);
        }
      })
    }
  }
  getImage(req.body)

})

app.get('/api/imageresult', function(req, res){

})

app.get('/api/historysearch', function(req, res){

})


app.listen(port,function(){
  console.log('listening port',port);
})
