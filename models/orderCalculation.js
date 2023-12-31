const mongoose = require("mongoose");
const { currentDate, check } = require("../helpers");

const orderCalculationSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  game_id: {
    type: String,
    required: true,
  },
  contract_money: {
    type: Number,
    required: true,
  },
  contract_type: {
    type: Number,
    required: true,
  },
  contract_number: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  pick: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  goods_id: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: currentDate(),
  },
  // project_id: {
  //   type: Number,
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    // required: true,
  },
  color: {
    type: String,
    // required: true,
  },
  amount: {
    type: String,
    // required: true,
  },
});

const OrderCalculation = (module.exports = mongoose.model('orderCalculation', orderCalculationSchema));
module.exports = mongoose.model("orderCalculation", orderCalculationSchema);


module.exports.saveOrderCalculation = async function (input) {
  const res = new OrderCalculation(input);
  let result = await res.save();
  return result;
}

module.exports.getOrderCalculation = async function (game_id) {
  return await OrderCalculation.find({ game_id: game_id }).exec();
}