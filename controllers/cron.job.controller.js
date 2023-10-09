const {
  currentDate,
  checkObj,
  merge_object,
  setDataType,
  todayDate,
  str_to_array,
  sum_of_array,
  checkArray,
  find_one,
} = require("../helpers");
const {
  saveGameOrderCalculation,
  getGameOrderCalculationByGameId,
  manageGameBudget,
} = require("../models/GameOrderCalculation");
const {
  saveGame,
  gameById,
  updateGame,
  removeGame,
} = require("../models/Games");
const { orderByGameId, updateOrder } = require("../models/Orders");
const { plusUserMoney } = require("../models/Users");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById(0);
    let all_orders = [];
    let order_cal = { amount: 0 };
    let gameBudgetAmmount = [0];
    let total_winner_pick_count = 0;
    let total_loser_pick_count = 0;
    if (checkObj(gameId)) {
      all_orders = await orderByGameId(setDataType(gameId._id, "s"));
      let gameOrders = await getGameOrderCalculationByGameId();
      let calResult = calCulationNumberPridiction(gameOrders,setDataType(gameId._id, "s"));
      updateGame(setDataType(gameId._id, "s"), calResult);
      for (let order of all_orders) {
        if (order.type === 2) {
          if (order.pick === setDataType(calResult.unit, "s")) {
            order_cal.amount = setDataType(order.delivery, "f");
            order_cal.status = 1;
          } else {
            order_cal.amount = 0;
            order_cal.status = 2;
          }
        } else {
          if (str_to_array(calResult.color).length === 1) {
            if (order.pick === calResult.color) {
              order_cal.amount = setDataType(order.delivery, "f");
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          } else {
            if (str_to_array(calResult.color).includes(order.pick)) {
              order_cal.amount = setDataType(order.delivery, "f") / 2;
              order_cal.status = 1;
            } else {
              order_cal.amount = 0;
              order_cal.status = 2;
            }
          }
        }
        if (order_cal.status === 1) {
          total_winner_pick_count++;
        } else {
          total_loser_pick_count++;
        }
        plusUserMoney(setDataType(order.user_id, "s"), {
          money: order_cal.amount,
        });
        gameBudgetAmmount.push(order_cal.amount);
        updateOrder(
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
      if(checkArray(gameOrders) && setDataType(find_one(gameOrders).game_id,"s") === setDataType(gameId._id, "s")){
        manageGameBudget(setDataType(gameId._id, "s"), {
          total_amount: gameOrders[0].total_price.total_amount,
          total_delivery: sum_of_array(gameBudgetAmmount),
          winner_pick_count: total_winner_pick_count,
          loser_pick_count: total_loser_pick_count,
        });
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

exports.customSetting = async (req, res, next) => {
  try {
    let object = await removeGame({ date: { $lt: todayDate() } });
    return res.status(200).json(object);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
