var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  //'mongodb://localhost/zfd4kxfelho',
  { useNewUrlParser: true }
);

module.exports = mongoose;
