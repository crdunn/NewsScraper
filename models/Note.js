var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  text: String,
  guess: Boolean
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;