var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  contentUrl : String,
  altText : String,
  pageUrl : String
  },{ versionKey: false})

module.exports = mongoose.model('ImageResult', ResultSchema)
