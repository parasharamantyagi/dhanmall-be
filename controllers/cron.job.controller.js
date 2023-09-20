const {
  currentDate,
  checkObj,
  filterArrayKey,
  arrayOfObject,
  sum_of_array,
  checkArray,
  merge_object,
  setDataType,
} = require("../helpers");
const { saveGame, gameById, updateGame } = require("../models/Games");
const { getOrderCalculation } = require("../models/OrderCalculation");
const { orderByGameId, updateOrder } = require("../models/Orders");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById();
    let all_orders = [];
    if (checkObj(gameId)) {
      all_orders = await getOrderCalculation(setDataType(gameId._id,'s'));
      let calResult = calCulationNumberPridiction(all_orders);
      updateGame(setDataType(gameId._id,'s'), calResult);
      for(let order of all_orders){
        await updateOrder(setDataType(order._id,'s'),merge_object(calResult,{amount: 10}));
      }
    }
    let periodNu = checkObj(gameId) ? gameId.period + 1 : 100000001;
    saveGame({ period: periodNu, project_id: 1, price: 0 ,date: currentDate()});
    return res.status(200).json(all_orders);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
