var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LatestSchema = new Schema({
  term: String,
  when: Date
})

module.exports = mongoose.model('Latest', LatestSchema)
