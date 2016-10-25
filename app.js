var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var dotenv = require('dotenv').config();
var api = process.env.API_PASS;
var request = require('request');
var mongoose = require('mongoose');
var Result = require('./models/Result.model');
var Latest = require('./models/Latest.model');
var db = "mongodb://heroku_dj37ccxg:mplttq9f2kgc243tqotrp8m9eh@ds031617.mlab.com:31617/heroku_dj37ccxg"

mongoose.connect(db);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})

//when user press search-btn, it will call Bing's api and save the query
//in the latest collection as history
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
    request(options, callback);
  }
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      storeData(info.value);
    }
  }
  function storeData(imageResults){
    //lets save the results from Bing's API Image Search API
    for(var i = 0; i < imageResults.length; i++){
      var newResult = new Result();
      newResult.contentUrl = imageResults[i].contentUrl;
      newResult.altText = imageResults[i].name;
      newResult.pageUrl = imageResults[i].hostPageUrl;
      newResult.save(function(err,data){
        if (err) throw console.error(err);
      })
    }
  }
  function addLatest(userQuery){
    var newLatest = new Latest();
    newLatest.term = req.body.query;
    newLatest.date = new Date();
    newLatest.save(function(err, data){
      if (err) throw console.error(err);
    })
  }
  //remove all exisiting image results
  Result.remove({}, function(err){
    if (err) throw console.error(err);
  })
  //lets call Bing's Image Search API
  getImage(req.body);
  //after we saved the results, lets save the query into Latest collection
  addLatest(req.body.query);
  res.send({link: 'api/imageresult' })
})

//stores all the results file from the search query
app.get('/api/imageresult', function(req, res){
  Result.find({},{_id:0})
    .exec(function(err, data){
      if (err) throw console.error(err);
      else{
        res.json(data);
      }
    })
})

app.get('/api/gethistory',function(req, res){
  res.send({link: 'api/historysearch'});
})

//stores all the history it was searched in database
app.get('/api/historysearch', function(req, res){
  Latest.find({},{_id:0}).sort({date: -1})
    .exec(function(err, data){
      if (err) throw console.error(err);
      else{
        res.json(data);
      }
    })
})

app.listen(port,function(){
  console.log('listening port',port);
})
