const { GDM_MODULE, GDM_CHARGES_FEE } = require("../config");
const {
  arrayOfObject,
  setDataType,
  array_to_str,
  checkObj,
  filterArrayKey,
  sum_of_array,
  checkArray,
  getSmallerAmount,
  check,
} = require("../helpers");
const { colors2 } = require("./colors");

module.exports.calCulationNumberPridiction = ({game, gameOrder, prevGameOrders, allOrders}) => {
  let unit = GDM_MODULE.rn({ min: 0, max: 9, integer: true });
  let unitArray = [];
  if (checkObj(game, "detail") && check(game.detail.set_unit)) {
    unitArray.push(game.detail.set_value);
  } else {
    if (
      setDataType(gameOrder.game_id._id, "s") ===
      setDataType(game._id, "s")
    ) {
      let last_five_transaction =
        sum_of_array(
          filterArrayKey(
            filterArrayKey(prevGameOrders, "game_budget"),
            "total_amount"
          )
        ) -
        sum_of_array(
          filterArrayKey(
            filterArrayKey(prevGameOrders, "game_budget"),
            "total_delivery"
          )
        );
      if (gameOrder.total_price.total_amount * 2 > gameOrder.total_price.total_delivery) {
        if (
          gameOrder.total_price.total_delivery <
          last_five_transaction
        ) {
          if (
            gameOrder.pick_red.total_delivery <
            gameOrder.pick_green.total_delivery
          ) {
            unitArray.push(1); // green pick
            unitArray.push(3);
            unitArray.push(7);
            unitArray.push(9);
          } else {
            unitArray.push(2); // red pick
            unitArray.push(4);
            unitArray.push(6);
            unitArray.push(8);
          }
        } else {
          if (gameOrder.pick_red.total_delivery < gameOrder.pick_green.total_delivery) {
            if (
              gameOrder.pick_red.total_delivery <
              gameOrder.pick_green.total_delivery / 2
            ) {
              unitArray.push(2); // red pick
              unitArray.push(4);
              unitArray.push(6);
              unitArray.push(8);
            } else {
              unitArray.push(0);
            }
          } else {
            if (gameOrder.pick_red.total_delivery / 2 > gameOrder.pick_green.total_delivery) {
              unitArray.push(1); // green pick
              unitArray.push(3);
              unitArray.push(7);
              unitArray.push(9);
            } else {
              unitArray.push(5);
            }
          }
        }
      } else {
        const getVal = [
          {
            no: 0,
            value: gameOrder.pick_0.total_delivery,
          },
          {
            no: 1,
            value: gameOrder.pick_1.total_delivery,
          },
          {
            no: 2,
            value: gameOrder.pick_2.total_delivery,
          },
          {
            no: 3,
            value: gameOrder.pick_3.total_delivery,
          },
          {
            no: 4,
            value: gameOrder.pick_4.total_delivery,
          },
          {
            no: 5,
            value: gameOrder.pick_5.total_delivery,
          },
          {
            no: 6,
            value: gameOrder.pick_6.total_delivery,
          },
          {
            no: 7,
            value: gameOrder.pick_7.total_delivery,
          },
          {
            no: 8,
            value: gameOrder.pick_8.total_delivery,
          },
          {
            no: 9,
            value: gameOrder.pick_9.total_delivery,
          },
        ];
        unitArray = getSmallerAmount(getVal);
      }
    }
  }
  if (checkArray(unitArray)) {
    const randomIndex = Math.floor(Math.random() * unitArray.length);
    unit = unitArray[randomIndex];
  }
  let otp = GDM_MODULE.rn({ min: 1222, max: 1599, integer: true });
  let calPrice = setDataType(otp, "s") + setDataType(unit, "s");
  calPrice = setDataType(calPrice, "n");
  let color = arrayOfObject(colors2, { id: unit }, "colour");
  return {
    status: 1,
    unit: unit,
    price: calPrice,
    color: array_to_str(color),
  };
};
