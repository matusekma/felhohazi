var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://zfd4kxfelho:7fgfpmdamIfkHTgOuxzyb4glcXT37BjUok61WvEkc9eMq1ViTF8zfi40DgIqg30o7YGjFtvD6Qz82Xc1g4E9sQ==@zfd4kxfelho.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false",
  { useNewUrlParser: true }
);

module.exports = mongoose;
