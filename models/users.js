const { setDataType, check, checkObj } = require("../helpers");
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
    type: Float,
    default: 0,
  },
  interest: {
    type: Float,
    default: 0,
  },
  recommendation_code: {
    type: String,
    required: true,
    unique: true,
  },
  promotion_code: {
    type: String,
    required: true,
    unique: true,
  },
  first_payment: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const User = (module.exports = mongoose.model("users", UserSchema));

module.exports.userById = async function (_id, field = "") {
  let select = check(field)
    ? field
    : "user_id nickname email money commission interest promotion_code first_payment";
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

module.exports.getUserForCommision = async function (id) {
  let return_data = {
    my_profile: {},
    user_1: {},
    user_2: {},
    user_3: {},
  };
  return_data.my_profile = await User.findOne({ _id: id }).select(
    "email money commission recommendation_code first_payment"
  );
  if (checkObj(return_data.my_profile)) {
    return_data.user_1 = await User.findOne({
      promotion_code: return_data.my_profile.recommendation_code,
    }).select("email money commission recommendation_code first_payment");
  }
  if (checkObj(return_data.user_1)) {
    return_data.user_2 = await User.findOne({
      promotion_code: return_data.user_1.recommendation_code,
    }).select("email money commission recommendation_code first_payment");
  }
  if (checkObj(return_data.user_2)) {
    return_data.user_3 = await User.findOne({
      promotion_code: return_data.user_2.recommendation_code,
    }).select("email money commission recommendation_code first_payment");
  }
  return return_data;
};

module.exports.plusUserMoney = async function (
  id,
  { money },
  type = "payment"
) {
  let user = await User.findOne({ _id: id }).select("money commission");
  let object = {
    money: setDataType(user.money, "f") + setDataType(money, "f"),
  };
  if (type === "reward") {
    object.commission =
      setDataType(user.commission, "f") + setDataType(money, "f");
  }
  await User.findOneAndUpdate({ _id: id }, object, {
    new: true,
  });
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

module.exports.updateUserFromId = async function (id, object) {
  await User.findOneAndUpdate({ _id: id }, object, {
    new: true,
  });
  return true;
};

module.exports = mongoose.model("users", UserSchema);
