const { GDM_MODULE } = require("./../config");
const { Author } = require("./module.Author");
const mongoose = GDM_MODULE.mongoose;


// Book model
const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  // other book fields
});

module.exports.Book = mongoose.model("Book", bookSchema);