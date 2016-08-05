var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var port = 3000;
var dotenv = require('dotenv').config();

var api = process.env.API_PASS

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
})


app.listen(port,function(){
  console.log('listening port',port);
})
