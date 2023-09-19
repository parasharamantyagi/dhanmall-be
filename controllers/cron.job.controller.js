const {
  currentDate,
  checkObj,
  filterArrayKey,
  arrayOfObject,
  sum_of_array,
  checkArray,
} = require("../helpers");
const { saveGame, gameById, updateGame } = require("../models/Games");
const { getOrderCalculation } = require("../models/OrderCalculation");
const { orderByGameId } = require("../models/Orders");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById();
    let all_orders = [];
    if (checkObj(gameId)) {
      all_orders = await getOrderCalculation(gameId._id.toString());
      let calResult = calCulationNumberPridiction(all_orders);
      updateGame(gameId._id.toString(), calResult);
    }
    let periodNu = checkObj(gameId) ? gameId.period + 1 : 100000001;
    saveGame({ period: periodNu, project_id: 1, price: 0 ,date: currentDate()});

    return res.status(200).json(all_orders);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
