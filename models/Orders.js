const { GDM_MODULE, PAGINATION_DEFAULT_LIMIT } = require("../config");
const mongoose = GDM_MODULE.mongoose;
const { currentDate, check, checkObj, setDataType } = require("../helpers");
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

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
    type: Float,
    required: true,
  },
  fee: {
    type: Float,
    required: true,
  },
  invest: {
    type: Float,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // 0 - waiting, 1 - win, 2 - fail
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
  },
  color: {
    type: String,
    default: null,
  },
  amount: {
    type: Float,
    default: null,
  },
  details: {
    type: Object,
    default: {},
  },
});

const Order = (module.exports = mongoose.model("orders", orderSchema));
module.exports = mongoose.model("orders", orderSchema);

module.exports.saveOrder = async function (input) {
  const res = new Order(input);
  let result = await res.save();
  return result;
};

module.exports.orderByGameId = async function (game_id) {
  return await Order.find({ game_id: game_id }).populate({ path: "user_id", select: ["game_total_contribution","game_winner_contribution"] }).select(['_id','type','user_id','pick','delivery','invest']).exec();
};

module.exports.getLastOrders = async function () {
  return await Order.find().limit(5).sort({ _id: -1 }).exec();
};

module.exports.countUserOrders = async function (user_id) {
  return await Order.find({ user_id: user_id }).countDocuments();
};

module.exports.orderOfUser = async function (user_id, object = {}) {
  if (checkObj(object, "page")) {
    let limit = checkObj(object, "limit")
      ? object.limit
      : PAGINATION_DEFAULT_LIMIT;
    return await Order.find({ user_id: user_id })
      .skip(setDataType(object.page, "n") * limit)
      .limit(limit)
      .sort({ _id: -1 })
      .exec();
  } else {
    return await Order.find(
      { user_id: user_id },
      {},
      { sort: { _id: -1 } }
    ).exec();
  }
};

module.exports.updateOrder = async function (order_id, input) {
  let data = await Order.findOneAndUpdate({ _id: order_id }, input, {
    new: true,
    upsert: true,
  });
  return data;
};

module.exports.removeOrder = async function (input) {
  return await Order.deleteMany(input);
};
