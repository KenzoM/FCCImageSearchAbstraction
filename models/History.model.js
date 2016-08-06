var mongoose = require('mongoose');
var Schema = mongoose.schema;

var HistorySchema = new Schema({
  term: String,
  when: Date
})

module.exports = mongoose.model('History', HistorySchema)
