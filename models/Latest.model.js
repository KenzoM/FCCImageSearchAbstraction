var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LatestSchema = new Schema({
  term: String,
  date: Date
}, { versionKey: false})

module.exports = mongoose.model('Latest', LatestSchema)
