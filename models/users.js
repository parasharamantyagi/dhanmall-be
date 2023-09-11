const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: 1,
  },
  nickname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: false,
  },
  verification_code: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  money: {
    type: String,
    default: 0,
  },
  commission: {
    type: String,
    default: 0,
  },
  interest: {
    type: String,
    default: 0,
  },
  recommendation_code: {
    type: String,
    required: true,
  },
  my_promotion_code: {
    type: String,
    required: false,
  },
});

const User = (module.exports = mongoose.model('users', UserSchema));


module.exports.userById = async function (_id) {
  return await User.findOne({ _id: _id });
}

module.exports = mongoose.model("users", UserSchema);

