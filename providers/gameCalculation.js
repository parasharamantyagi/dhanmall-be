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

module.exports.calCulationNumberPridiction = (currentGame, gameOrders, current_game) => {
  let unit = GDM_MODULE.rn({ min: 0, max: 9, integer: true });
  let unitArray = [];
  if (checkObj(current_game, "detail") && check(current_game.detail.set_unit)) {
    unitArray.push(current_game.detail.set_value);
  } else {
    if (
      setDataType(currentGame.game_id._id, "s") ===
      setDataType(current_game._id, "s")
    ) {
      let last_five_transaction =
        sum_of_array(
          filterArrayKey(
            filterArrayKey(gameOrders, "game_budget"),
            "total_amount"
          )
        ) -
        sum_of_array(
          filterArrayKey(
            filterArrayKey(gameOrders, "game_budget"),
            "total_delivery"
          )
        );
      if (currentGame.total_price.total_amount * 2 > currentGame.total_price.total_delivery) {
        if (
          currentGame.total_price.total_delivery <
          last_five_transaction
        ) {
          if (
            currentGame.pick_red.total_delivery <
            currentGame.pick_green.total_delivery
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
          if (currentGame.pick_red.total_delivery < currentGame.pick_green.total_delivery) {
            if (
              currentGame.pick_red.total_delivery <
              currentGame.pick_green.total_delivery / 2
            ) {
              unitArray.push(2); // red pick
              unitArray.push(4);
              unitArray.push(6);
              unitArray.push(8);
            } else {
              unitArray.push(0);
            }
          } else {
            if (currentGame.pick_red.total_delivery / 2 > currentGame.pick_green.total_delivery) {
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
            value: currentGame.pick_0.total_delivery,
          },
          {
            no: 1,
            value: currentGame.pick_1.total_delivery,
          },
          {
            no: 2,
            value: currentGame.pick_2.total_delivery,
          },
          {
            no: 3,
            value: currentGame.pick_3.total_delivery,
          },
          {
            no: 4,
            value: currentGame.pick_4.total_delivery,
          },
          {
            no: 5,
            value: currentGame.pick_5.total_delivery,
          },
          {
            no: 6,
            value: currentGame.pick_6.total_delivery,
          },
          {
            no: 7,
            value: currentGame.pick_7.total_delivery,
          },
          {
            no: 8,
            value: currentGame.pick_8.total_delivery,
          },
          {
            no: 9,
            value: currentGame.pick_9.total_delivery,
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
