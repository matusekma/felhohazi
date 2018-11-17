var Schema = require("mongoose").Schema;
var db = require("../config/db");

var Actor = db.model("Actor", {
  name: String,
  birthYear: Number,
  nationality: String,
  comment: String,
  description: String,
  picName: String,
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  _films: [{ type: Schema.Types.ObjectId, ref: "Film" }]
});

module.exports = Actor;
