const {
  currentDate,
  checkObj,
  merge_object,
  setDataType,
  todayDate,
  str_to_array,
} = require("../helpers");
const { saveGameOrderCalculation, getGameOrderCalculationByGameId } = require("../models/GameOrderCalculation");
const { saveGame, gameById, updateGame } = require("../models/Games");
const { orderByGameId, updateOrder } = require("../models/Orders");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById(0);
    let all_orders = [];
    let order_cal = { amount: 0 };
    if (checkObj(gameId)) {
      all_orders = await orderByGameId(setDataType(gameId._id, "s"));
      let gameOrders = await getGameOrderCalculationByGameId(setDataType(gameId._id, "s"));
      let calResult = calCulationNumberPridiction(gameOrders);
      updateGame(setDataType(gameId._id, "s"), calResult);
      for (let order of all_orders) {
        if (order.type === 2) {
          if (order.pick === setDataType(calResult.unit, "s")) {
            order_cal.amount = setDataType(order.delivery,"f");
            order_cal.status = 1;
          } else {
            order_cal.amount = 0;
            order_cal.status = 2;
          }
        } else {
          if (str_to_array(calResult.color).length === 1) {
            if (order.pick === calResult.color) {
              order_cal.amount = setDataType(order.delivery,"f");
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          } else {
            if (str_to_array(calResult.color).includes(order.pick)) {
              order_cal.amount = setDataType(order.delivery,"f") / 2;
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          }
        }
        await updateOrder(
          setDataType(order._id, "s"),
          merge_object(
            {
              unit: calResult.unit,
              color: calResult.color,
              price: calResult.price,
            },
            order_cal
          )
        );
      }
    }
    let period = setDataType(1, "padStart");
    if (checkObj(gameId)) {
      if (gameId.period && setDataType(gameId.period, "int") < 480) {
        period = setDataType(setDataType(gameId.period, "int") + 1, "padStart");
      } else {
        period = setDataType(1, "padStart");
      }
    }
    let newGame = await saveGame({
      period: period,
      project_id: 1,
      price: 0,
      begintime: currentDate(),
      date: todayDate(),
    });
    saveGameOrderCalculation({
      game_id: setDataType(newGame._id, "s"),
      date: currentDate(),
    });
    return res.status(200).json(true);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
