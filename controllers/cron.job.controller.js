const {
  currentDate,
  checkObj,
  filterArrayKey,
  arrayOfObject,
  sum_of_array,
  checkArray,
  merge_object,
  setDataType,
  todayDate,
  check,
} = require("../helpers");
const { saveGame, gameById, updateGame } = require("../models/Games");
const { getOrderCalculation, deleteOrderCalculation } = require("../models/OrderCalculation");
const { orderByGameId, updateOrder } = require("../models/Orders");
const { calCulationNumberPridiction } = require("../providers/gameCalculation");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById();
    let all_orders = [];
    let order_cal = { amount: 0 };
    if (checkObj(gameId)) {
      all_orders = await getOrderCalculation(setDataType(gameId._id, "s"));
      let calResult = calCulationNumberPridiction(all_orders);
      updateGame(setDataType(gameId._id,'s'), calResult);
      for (let order of all_orders) {
        if (order.type === 2) {
          if (order.pick === calResult.color) {
            order_cal.amount = order.delivery * 9;
            order_cal.status = 1;
          } else {
            order_cal.amount = 0;
            order_cal.status = 2;
          }
        } else {
          if (order.pick === calResult.color) {
            order_cal.amount = order.delivery * 2;
            order_cal.status = 1;
          } else {
            order_cal.amount = 0;
            order_cal.status = 2;
          }
        }
        await updateOrder(
          setDataType(order.order_id, "s"),
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
      deleteOrderCalculation(setDataType(gameId._id, "s"));
    }
    let period = setDataType(1,'padStart');
    if(checkObj(gameId)){
      if(gameId.period && setDataType(gameId.period,'int') < 480){
        period = setDataType(setDataType(gameId.period,'int') + 1,'padStart');
      }else{
        period = setDataType(1,'padStart');
      }
    }
    saveGame({ period: period, project_id: 1, price: 0 , begintime: currentDate() , date: todayDate()});
    return res.status(200).json(true);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
};
