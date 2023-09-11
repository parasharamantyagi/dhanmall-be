const mongoose = require("mongoose");

const my_childrens = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
  },
  my_promotion_code: {
    type: String,
    required: true,
  },
  createtime: {
    type: String,
    required: true,
  },
  water_reward: {
    type: String,
    required: true,
  },
  first_reward: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("my_childrens", my_childrens);;