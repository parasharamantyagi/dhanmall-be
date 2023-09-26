const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate } = require("../helpers");

const gameOrderCalculationSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  pick_red: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_green: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_violet: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_0: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_1: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_2: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_3: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_4: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_5: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_6: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_7: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_8: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_9: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  total_price: {
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  date: {
    type: Number,
    default: currentDate(),
  },
});

const GameOrderCalculation = (module.exports = mongoose.model(
  "GameOrderCalculation",
  gameOrderCalculationSchema
));

module.exports.saveGameOrderCalculation = async function (input) {
  const res = new GameOrderCalculation(input);
  let result = await res.save();
  return result;
};

module.exports.updateGameOrderCalculation = async function (game_id,object) {
  // console.log(object);
  return await GameOrderCalculation.updateOne(
    { game_id: game_id },
    { $inc: { "total_price.total_delivery": object.delivery,"total_price.pick_count": 1 } }
  );
};