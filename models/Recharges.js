const { GDM_MODULE, PAGINATION_DEFAULT_LIMIT } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate, checkObj, setDataType } = require("../helpers");

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
    enum: ["upipay", "qrcode"],
    default: "upipay",
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

module.exports.getRecharge = async function (user_id,object) {
  return await Recharge.find({ user_id: user_id })
    .populate({ path: "user_id", select: "nickname mobile" })
    .skip(setDataType(object.page, "n") * PAGINATION_DEFAULT_LIMIT)
    .limit(PAGINATION_DEFAULT_LIMIT)
    .sort({ _id: -1 }).exec();
};

module.exports.billingRecharge = async function (input) {
  let limit = checkObj(input, "limit") ? input.limit : 10;
  let skip = checkObj(input, "page") ? (input.page - 1) * 10 : 0;
  return await Recharge.find()
    .populate({ path: "user_id", select: "nickname mobile" })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 }).exec();
};

module.exports.countRecharge = async function (obj = {}) {
  return await Recharge.find(obj).countDocuments();
};

module.exports.saveRecharge = async function (input) {
  const res = new Recharge(input);
  let result = await res.save();
  return result;
};
