const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);
const { currentDate, merge_object, check, checkObj } = require("../helpers");

const gameOrderCalculationSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  pick_red: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_green: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_violet: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_0: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_1: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_2: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_3: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_4: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_5: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_6: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_7: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_8: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  pick_9: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  total_price: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    pick_count: { type: Number, default: 0 },
  },
  game_budget: {
    total_amount: { type: Float, default: 0 },
    total_delivery: { type: Float, default: 0 },
    winner_pick_count: { type: Number, default: 0 },
    loser_pick_count: { type: Number, default: 0 },
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


module.exports.getGameOrderCalculationByGameId = async function (obj = {}) {
  if(checkObj(obj,'type') && obj.type === 'current'){
    let where = {};
    where = checkObj(obj, 'game_id') ? { game_id: obj.game_id } : {};
    return await GameOrderCalculation.findOne(where).populate({ path: "game_id" }).sort({ date: -1 }).exec();
  }else{
    let selected = checkObj(obj,'selected') ? obj.selected : [];
    let where = { "total_price.total_amount": { $ne: 0 } };
    if(checkObj(obj,'game_not_id')){
      where = merge_object(where,{ game_id: { $ne: obj.game_not_id } });
    }
    return await GameOrderCalculation.find(where)
    .select(selected)
    // .populate({ path: "game_id" })
    .limit(8).sort({ date: -1 }).exec();
  }
};

module.exports.getGameTrend = async function () {
  // { "total_price.total_amount": { $ne: 0 } }
  return await GameOrderCalculation.find()
    .select([])
    .populate({ path: "game_id" })
    .limit(8).sort({ date: -1 }).exec();
}

module.exports.updateGameOrderCalculation = async function (game_id,object) {
  let updateObj = { "total_price.total_amount": (object.contract_money * object.contract_number),"total_price.total_delivery": object.delivery,"total_price.pick_count": 1 };
  if(object.pick === 'red'){
    updateObj = merge_object(updateObj,{ "pick_red.total_amount": (object.contract_money * object.contract_number),"pick_red.total_delivery": object.delivery,"pick_red.pick_count": 1 });
  }else if(object.pick === 'green'){
    updateObj = merge_object(updateObj,{ "pick_green.total_amount": (object.contract_money * object.contract_number),"pick_green.total_delivery": object.delivery,"pick_green.pick_count": 1 });
  }else if(object.pick === 'violet'){
    updateObj = merge_object(updateObj,{ "pick_violet.total_amount": (object.contract_money * object.contract_number),"pick_violet.total_delivery": object.delivery,"pick_violet.pick_count": 1 });
  }else if(object.pick == 0){
    updateObj = merge_object(updateObj,{ "pick_0.total_amount": (object.contract_money * object.contract_number),"pick_0.total_delivery": object.delivery,"pick_0.pick_count": 1 });
  }else if(object.pick == 1){
    updateObj = merge_object(updateObj,{ "pick_1.total_amount": (object.contract_money * object.contract_number),"pick_1.total_delivery": object.delivery,"pick_1.pick_count": 1 });
  }else if(object.pick == 2){
    updateObj = merge_object(updateObj,{ "pick_2.total_amount": (object.contract_money * object.contract_number),"pick_2.total_delivery": object.delivery,"pick_2.pick_count": 1 });
  }else if(object.pick == 3){
    updateObj = merge_object(updateObj,{ "pick_3.total_amount": (object.contract_money * object.contract_number),"pick_3.total_delivery": object.delivery,"pick_3.pick_count": 1 });
  }else if(object.pick == 4){
    updateObj = merge_object(updateObj,{ "pick_4.total_amount": (object.contract_money * object.contract_number),"pick_4.total_delivery": object.delivery,"pick_4.pick_count": 1 });
  }else if(object.pick == 5){
    updateObj = merge_object(updateObj,{ "pick_5.total_amount": (object.contract_money * object.contract_number),"pick_5.total_delivery": object.delivery,"pick_5.pick_count": 1 });
  }else if(object.pick == 6){
    updateObj = merge_object(updateObj,{ "pick_6.total_amount": (object.contract_money * object.contract_number),"pick_6.total_delivery": object.delivery,"pick_6.pick_count": 1 });
  }else if(object.pick == 7){
    updateObj = merge_object(updateObj,{ "pick_7.total_amount": (object.contract_money * object.contract_number),"pick_7.total_delivery": object.delivery,"pick_7.pick_count": 1 });
  }else if(object.pick == 8){
    updateObj = merge_object(updateObj,{ "pick_8.total_amount": (object.contract_money * object.contract_number),"pick_8.total_delivery": object.delivery,"pick_8.pick_count": 1 });
  }else if(object.pick == 9){
    updateObj = merge_object(updateObj,{ "pick_9.total_amount": (object.contract_money * object.contract_number),"pick_9.total_delivery": object.delivery,"pick_9.pick_count": 1 });
  }
  return await GameOrderCalculation.updateOne(
    { game_id: game_id },
    { $inc:  updateObj}
  );
};

module.exports.manageGameBudget = async function (game_id,object) {
  return await GameOrderCalculation.updateOne(
    { game_id: game_id },
    {game_budget: object}
  );
}

module.exports.removeGameOrderCalculation = async function (input) {
  return await GameOrderCalculation.deleteMany(input);
};
