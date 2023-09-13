const mongoose = require("mongoose");
const { promotionCode } = require("../helpers/crypto");

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
  promotion_code: {
    type: String,
    required: true,
    unique: true,
    // default: promotionCode(),
  },
});

const User = (module.exports = mongoose.model("users", UserSchema));

module.exports.userById = async function (_id) {
  return await User.findOne(
    { _id: _id },
    { password: 0, verification_code: 0 }
  ).then((result) => {
    return JSON.parse(JSON.stringify(result));
  });
};

module.exports.getChildren = async function (_id) {
  return await User.findOne(
    { _id: _id },
    { password: 0, verification_code: 0 }
  ).then(async (result) => {
    result = JSON.parse(JSON.stringify(result));
    result.children = await User.find(
      { recommendation_code: result.promotion_code },
      {
        password: 0,
        verification_code: 0,
        money: 0,
        commission: 0,
        interest: 0,
        recommendation_code: 0,
        promotion_code: 0,
        __v: 0,
      }
    );
    return result;
  });
};

module.exports = mongoose.model("users", UserSchema);
