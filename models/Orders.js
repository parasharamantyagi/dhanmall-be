const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const { currentDate, check } = require("../helpers");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
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
    enum: [0, 1, 2],
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
    default: 0,
  },
  unit: {
    type: Number,
    default: null,
    // required: true,
  },
  color: {
    type: String,
    default: null,
    // required: true,
  },
  amount: {
    type: String,
    default: null,
    // required: true,
  },
});
// module.exports = mongoose.model("orders", orderSchema);

const Order = (module.exports = mongoose.model("orders", orderSchema));
module.exports = mongoose.model("orders", orderSchema);

module.exports.saveOrder = async function (input) {
  const res = new Order(input);
  let result = await res.save();
  return result;
};

module.exports.orderByGameId = async function (game_id) {
  return await Order.find({ game_id: game_id }).exec();
};

module.exports.orderOfUser = async function (user_id) {
  return await Order.find(
    { user_id: user_id },
    {},
    { sort: { _id: -1 } }
  ).exec();
};

module.exports.updateOrder = async function (order_id, input) {
  let data = await Order.findOneAndUpdate({ _id: order_id }, input, {
    new: true,
    upsert: true,
  });
  return data;
};
