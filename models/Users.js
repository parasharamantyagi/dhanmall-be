const { setDataType, check, checkObj, currentDate } = require("../helpers");
const { GDM_MODULE } = require("../config");
const { saveMyChildren } = require("./MyChildrens");
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
    required: false,
  },
  mobile: {
    type: String,
    unique: true,
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
  is_special: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.userById = async function (_id, field = "") {
  let select = check(field)
    ? field
    : "user_id nickname email mobile money commission interest promotion_code first_payment";
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
    user_4: {},
  };
  let selectField =
    "nickname email money commission recommendation_code first_payment";
  return_data.my_profile = await User.findOne({ _id: id }).select(selectField);
  if (checkObj(return_data.my_profile)) {
    return_data.user_1 = await User.findOne({
      promotion_code: return_data.my_profile.recommendation_code,
    }).select(selectField);
  }
  if (checkObj(return_data.user_1)) {
    return_data.user_2 = await User.findOne({
      promotion_code: return_data.user_1.recommendation_code,
    }).select(selectField);
  }
  if (checkObj(return_data.user_2)) {
    return_data.user_3 = await User.findOne({
      promotion_code: return_data.user_2.recommendation_code,
    }).select(selectField);
  }
  if (checkObj(return_data.user_3)) {
    return_data.user_4 = await User.findOne({
      promotion_code: return_data.user_3.recommendation_code,
    }).select(selectField);
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

module.exports.manageUserAllChildren = async function (object) {
  let userForCommision = await this.getUserForCommision(
    setDataType(object._id)
  );
  if (
    checkObj(userForCommision, "user_1") &&
    checkObj(userForCommision.user_1)
  ) {
    saveMyChildren({
      user_id: userForCommision.user_1._id,
      childrens_id: userForCommision.my_profile._id,
      date: currentDate(),
      water_reward: 0,
      first_reward: 0,
      type: "lavel_1",
    });
  }
  if (
    checkObj(userForCommision, "user_2") &&
    checkObj(userForCommision.user_2)
  ) {
    saveMyChildren({
      user_id: userForCommision.user_2._id,
      childrens_id: userForCommision.my_profile._id,
      date: currentDate(),
      water_reward: 0,
      first_reward: 0,
      type: "lavel_2",
    });
  }
  if (
    checkObj(userForCommision, "user_3") &&
    checkObj(userForCommision.user_3)
  ) {
    saveMyChildren({
      user_id: userForCommision.user_3._id,
      childrens_id: userForCommision.my_profile._id,
      date: currentDate(),
      water_reward: 0,
      first_reward: 0,
      type: "lavel_3",
    });
  }
  if (
    checkObj(userForCommision, "user_4") &&
    checkObj(userForCommision.user_4)
  ) {
    saveMyChildren({
      user_id: userForCommision.user_4._id,
      childrens_id: userForCommision.my_profile._id,
      date: currentDate(),
      water_reward: 0,
      first_reward: 0,
      type: "lavel_4",
    });
  }
  return true;
};

module.exports.User = mongoose.model("User", UserSchema);
