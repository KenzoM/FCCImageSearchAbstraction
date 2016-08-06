var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var port = 3000;
var dotenv = require('dotenv').config();
var api = process.env.API_PASS
var request = require('request');
var answer = ""




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

  function storeData(stuff){
    res.send({stuff})
  }
  getImage(req.body)

})

app.get('/api/imageresult', function(req, res){

})


app.listen(port,function(){
  console.log('listening port',port);
})
