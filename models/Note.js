var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  body: String,
  guess: Boolean
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;