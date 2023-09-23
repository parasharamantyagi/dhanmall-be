const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate } = require("../helpers");

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

module.exports.getRecharge = async function (user_id) {
  return await Recharge.find({ user_id: user_id }, {}, { sort: { date: -1 } })
    .populate({ path: "user_id", select: "nickname mobile" })
    .exec();
};

module.exports.saveRecharge = async function (input) {
  const res = new Recharge(input);
  let result = await res.save();
  return result;
};
