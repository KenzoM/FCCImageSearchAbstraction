var mongoose = require('mongoose');
var Schema = mongoose.schema;

var ResultSchema = new Schema({
  contentUrl : String,
  altText : String,
  pageUrl : String
})

module.exports = mongoose.model('ImageResult', ResultSchema)
