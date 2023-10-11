const { GDM_MODULE, PAGINATION_DEFAULT_LIMIT } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate, checkObj, setDataType } = require("../helpers");

const rechargeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["recharge", "withdraw"],
    default: "recharge",
  },
  ammount: {
    type: Float,
  },
  details: Object,
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

module.exports.getRechargeDetail = async function (where) {
  return await Recharge.findOne(where)
    .populate({ path: "user_id", select: "nickname mobile" })
    .then((result) => {
      return JSON.parse(JSON.stringify(result));
    });
};

module.exports.getRechargeModule = async function (where, object) {
  return await Recharge.find(where)
    .populate({ path: "user_id", select: "nickname mobile" })
    .skip(setDataType(object.page, "n") * PAGINATION_DEFAULT_LIMIT)
    .limit(PAGINATION_DEFAULT_LIMIT)
    .sort({ _id: -1 })
    .exec();
};

module.exports.billingRecharge = async function (object) {
  return await Recharge.find({ type: object.type })
    .populate({ path: "user_id", select: "nickname mobile" })
    .skip(setDataType(object.page, "n") * PAGINATION_DEFAULT_LIMIT)
    .limit(PAGINATION_DEFAULT_LIMIT)
    .sort({ _id: -1 })
    .exec();
};

module.exports.updatedRechargeModule = async function (id, obj = {}) {
  let result = await Recharge.findOneAndUpdate(
    { _id: setDataType(id, "string") },
    obj,
    {
      upsert: true, // Create the document if it doesn't exist
      new: true, // Return the modified document as the result
    }
  );
  return result;
};

module.exports.countRecharge = async function (obj = {}) {
  return await Recharge.find(obj).countDocuments();
};

module.exports.saveRecharge = async function (input) {
  const res = new Recharge(input);
  let result = await res.save();
  return result;
};

module.exports.removeRecharge = async function (input) {
  return await Recharge.deleteMany(input);
};