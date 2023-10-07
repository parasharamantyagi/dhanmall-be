const { GDM_MODULE } = require("../config");
const {
  arrayOfObject,
  setDataType,
  array_to_str,
  checkObj,
} = require("../helpers");
const { colors2 } = require("./colors");

module.exports.calCulationNumberPridiction = (gameOrders) => {
  let unit = GDM_MODULE.rn({ min: 0, max: 9, integer: true });
  if (checkObj(gameOrders)) {
    const {
      pick_red,
      pick_green,
      pick_violet,
      pick_0,
      pick_1,
      pick_2,
      pick_3,
      pick_4,
      pick_5,
      pick_6,
      pick_7,
      pick_8,
      pick_9,
      total_price,
    } = gameOrders;
    if (total_price.total_delivery) {
      if (pick_red.total_delivery < pick_green.total_delivery) {
        if (
          pick_2.total_delivery <= pick_4.total_delivery &&
          pick_2.total_delivery <= pick_6.total_delivery &&
          pick_2.total_delivery <= pick_8.total_delivery
        ) {
          unit = 2;
        } else if (
          pick_4.total_delivery <= pick_2.total_delivery &&
          pick_4.total_delivery <= pick_6.total_delivery &&
          pick_4.total_delivery <= pick_8.total_delivery
        ) {
          unit = 4;
        } else if (
          pick_6.total_delivery <= pick_2.total_delivery &&
          pick_6.total_delivery <= pick_4.total_delivery &&
          pick_6.total_delivery <= pick_8.total_delivery
        ) {
          unit = 6;
        } else if (
          pick_8.total_delivery <= pick_2.total_delivery &&
          pick_8.total_delivery <= pick_4.total_delivery &&
          pick_8.total_delivery <= pick_6.total_delivery
        ) {
          unit = 8;
        }
      } else if (pick_red.total_delivery > pick_green.total_delivery) {
        if (
          pick_1.total_delivery <= pick_3.total_delivery &&
          pick_1.total_delivery <= pick_7.total_delivery &&
          pick_1.total_delivery <= pick_9.total_delivery
        ) {
          unit = 1;
        } else if (
          pick_3.total_delivery <= pick_1.total_delivery &&
          pick_3.total_delivery <= pick_7.total_delivery &&
          pick_3.total_delivery <= pick_9.total_delivery
        ) {
          unit = 3;
        } else if (
          pick_7.total_delivery <= pick_1.total_delivery &&
          pick_7.total_delivery <= pick_3.total_delivery &&
          pick_7.total_delivery <= pick_9.total_delivery
        ) {
          unit = 7;
        } else if (
          pick_9.total_delivery <= pick_1.total_delivery &&
          pick_9.total_delivery <= pick_3.total_delivery &&
          pick_9.total_delivery <= pick_7.total_delivery
        ) {
          unit = 9;
        }
      } else {
      }
    }
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
