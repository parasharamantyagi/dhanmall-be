const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate } = require("../helpers");

const bankCardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  actual_name: {
    type: String,
    default: "",
  },
  ifsc_code: {
    type: String,
    default: "",
  },
  bank_name: {
    type: String,
    default: "",
  },
  bank_account: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  mobile_number: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  date: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 1,
  },
});

const BankCard = (module.exports = mongoose.model("BankCards", bankCardSchema));

module.exports.getBankCardModule = async function (user_id) {
  return await BankCard.find({ user_id: user_id }, {}, { sort: { date: -1 } })
    .populate({ path: "user_id", select: "nickname mobile" })
    .exec();
};

module.exports.getOneBankCardModule = async function (input) {
  return await BankCard.findOne(input, {}, { sort: { date: -1 } })
    .exec();
};

module.exports.getBankCardDetailModule = async function (input) {
  return await BankCard.findOne(input, {}, { sort: { date: -1 } })
    .populate({ path: "user_id", select: "nickname mobile" })
    .exec();
};

module.exports.saveBankCardModule = async function (input) {
  const res = new BankCard(input);
  let result = await res.save();
  return result;
};
