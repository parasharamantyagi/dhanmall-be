const { GDM_MODULE } = require("./../config");
const mongoose = GDM_MODULE.mongoose;

const authorSchema = new mongoose.Schema({
  name: String,
  // other author fields
});

module.exports.Author = mongoose.model("Author", authorSchema);