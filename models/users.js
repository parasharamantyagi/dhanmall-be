const { setDataType, check } = require("../helpers");
const { GDM_MODULE } = require("./../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

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
    type: Float,
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
  },
});

const User = (module.exports = mongoose.model("users", UserSchema));

module.exports.userById = async function (_id, field = "") {
  let select = check(field) ? field : "user_id email money commission interest";
  return await User.findOne(
    { _id: _id }
    // { password: 0, verification_code: 0 }
  )
    .select(select)
    .then((result) => {
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

module.exports.plusUserMoney = async function (id, { money }) {
  let user = await User.findOne({ _id: id }).select("money");
  await User.findOneAndUpdate(
    { _id: id },
    { money: setDataType(user.money, "f") + setDataType(money, "f") },
    {
      new: true,
    }
  );
  return true;
};

module.exports.minusUserMoney = async function (id, { money }) {
  let user = await User.findOne({ _id: id }).select("money");
  await User.findOneAndUpdate(
    { _id: id },
    { money: setDataType(user.money, "f") - setDataType(money, "f") },
    {
      new: true,
    }
  );
  return true;
};

module.exports = mongoose.model("users", UserSchema);
