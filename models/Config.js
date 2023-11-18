const { GDM_MODULE } = require("../config");
const { checkObj, merge_object } = require("../helpers");
const mongoose = GDM_MODULE.mongoose;
const Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

const ConfigSchema = new mongoose.Schema({
  position: {
    type: String,
    default: 'one',
  },
  invest: {
    type: Float,
    default: 0,
  },
  delivery: {
    type: Float,
    default: 0,
  },
  recharge: {
    type: Float,
    default: 0,
  },
  withdraw: {
    type: Float,
    default: 0,
  },
  set_game_invest: {
    type: Float,
    default: 0,
  },
  set_game_delivery: {
    type: Float,
    default: 0,
  },
});
const Config = (module.exports = mongoose.model("Config", ConfigSchema));

module.exports.saveConfig = async function (object, type = "") {
  let updateObj = {};
  let option = { upsert: true, new: true, setDefaultsOnInsert: true };
  if(['Order','win','payment','withdraw','set_game_invest','set_game_delivery'].includes(type)){
    updateObj = merge_object(updateObj,object);
  }
  if (checkObj(updateObj)) {
    return await Config.findOneAndUpdate({position: 'one'}, { $inc: updateObj },option).exec();
  } else {
    return true;
  }
};

module.exports.getConfig = async function () {
  return await Config.findOne({position: 'one'}).exec();
}