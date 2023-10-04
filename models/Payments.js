const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const { currentDate, checkObj } = require("../helpers");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ammount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["created", "reward_1", "reward_2", "reward_3", "reward_4", "reward_5"],
    default: "created",
  },
  date: {
    type: Number,
    default: currentDate(),
  },
});

const Payment = (module.exports = mongoose.model("payments", paymentSchema));
module.exports = mongoose.model("payments", paymentSchema);

module.exports.getPayment = async function (user_id) {
  return await Payment.findOne({ user_id: user_id }, {}, { sort: { _id: -1 } });
};

module.exports.savePayment = async function (input) {
  if(!checkObj(input,'date')){
    input.date = currentDate();
  }
  const res = new Payment(input);
  let result = await res.save();
  return result;
};
