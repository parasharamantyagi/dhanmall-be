const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate, checkObj } = require("../helpers");

const rechargeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ammount: {
    type: Float,
  },
  transaction_id: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["type_1", "reward_2"],
    default: "type_1",
  },
  status: {
    type: String,
    enum: ["processing", "success", "failure"],
    default: "processing",
  },
  date: {
    type: Number,
    default: 0,
  },
});

const Recharge = (module.exports = mongoose.model("Recharge", rechargeSchema));

module.exports.getRecharge = async function (user_id,input) {
  let limit = checkObj(input, "limit") ? input.limit : 10;
  let skip = checkObj(input, "page") ? (input.page - 1) * 10 : 0;
  return await Recharge.find({ user_id: user_id })
    .populate({ path: "user_id", select: "nickname mobile" })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 }).exec();
};

module.exports.countRecharge = async function () {
  return await Recharge.countDocuments();
};

module.exports.saveRecharge = async function (input) {
  const res = new Recharge(input);
  let result = await res.save();
  return result;
};
