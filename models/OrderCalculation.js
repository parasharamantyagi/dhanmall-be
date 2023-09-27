const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate } = require("../helpers");

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
    type: Float,
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

const OrderCalculation = (module.exports = mongoose.model('OrderCalculation', orderCalculationSchema));
module.exports = mongoose.model("OrderCalculation", orderCalculationSchema);


module.exports.saveOrderCalculation = async function (input) {
  const res = new OrderCalculation(input);
  let result = await res.save();
  return result;
}

module.exports.getOrderCalculation = async function (game_id) {
  return await OrderCalculation.find({ game_id: game_id }).exec();
}



module.exports.updateOrderCalculation = async function (_id) {
  // details: {
  //   total_value: String,
  //   total_count: Number,
  // }
  return await OrderCalculation.updateOne({ _id: _id }, { $inc: {'details.total_count': 10} });

  // return await OrderCalculation.findOneAndUpdate(
  //   { _id: _id },
  //   { $set: { 'details.total_value': 'object value handle','details.total_count': 12 } },
  //   { new: true,upsert: true});
}