const { GDM_MODULE } = require("../config");
const {
  filterArrayKey,
  arrayOfObject,
  sum_of_array,
  setDataType,
  array_to_str,
  checkArray,
} = require("../helpers");
const { colors2 } = require("./colors");

module.exports.calCulationNumberPridiction = (gameOrders) => {
  let unit = GDM_MODULE.rn({ min: 0, max: 9, integer: true });
  const { pick_red, pick_green, pick_violet, pick_0, pick_1, pick_2, pick_3, pick_4, pick_5, pick_6, pick_7, pick_8, pick_9, total_price } = gameOrders;
  if(total_price.total_delivery){
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

  let otp = GDM_MODULE.rn({ min: 1222, max: 1599, integer: true });
  let calPrice = setDataType(otp, "s") + setDataType(unit, "s");
  calPrice = setDataType(calPrice, "n");
  let color = arrayOfObject(colors2, { id: unit }, "colour");
  return {
    status: 1,
    unit: unit,
    price: calPrice,
    color: array_to_str(color)
  };
};

module.exports.gameHistoryTrend = (all_orders) => {
  let pick_red = arrayOfObject(all_orders, { pick: "red" }, Array);
  let pick_green = arrayOfObject(all_orders, { pick: "green" }, Array);
  let pick_violet = arrayOfObject(all_orders, { pick: "violet" }, Array);
  let pick_0 = arrayOfObject(all_orders, { pick: "0" }, Array);
  let pick_1 = arrayOfObject(all_orders, { pick: "1" }, Array);
  let pick_2 = arrayOfObject(all_orders, { pick: "2" }, Array);
  let pick_3 = arrayOfObject(all_orders, { pick: "3" }, Array);
  let pick_4 = arrayOfObject(all_orders, { pick: "4" }, Array);
  let pick_5 = arrayOfObject(all_orders, { pick: "5" }, Array);
  let pick_6 = arrayOfObject(all_orders, { pick: "6" }, Array);
  let pick_7 = arrayOfObject(all_orders, { pick: "7" }, Array);
  let pick_8 = arrayOfObject(all_orders, { pick: "8" }, Array);
  let pick_9 = arrayOfObject(all_orders, { pick: "9" }, Array);
  return {
    pick_red: { result: (pick_red.length / all_orders.length) * 100 },
    pick_green: { result: (pick_green.length / all_orders.length) * 100 },
    pick_violet: { result: (pick_violet.length / all_orders.length) * 100 },
    pick_0: { result: (pick_0.length / all_orders.length) * 100 },
    pick_1: { result: (pick_1.length / all_orders.length) * 100 },
    pick_2: { result: (pick_2.length / all_orders.length) * 100 },
    pick_3: { result: (pick_3.length / all_orders.length) * 100 },
    pick_4: { result: (pick_4.length / all_orders.length) * 100 },
    pick_5: { result: (pick_5.length / all_orders.length) * 100 },
    pick_6: { result: (pick_6.length / all_orders.length) * 100 },
    pick_7: { result: (pick_7.length / all_orders.length) * 100 },
    pick_8: { result: (pick_8.length / all_orders.length) * 100 },
    pick_9: { result: (pick_9.length / all_orders.length) * 100 },
  };
};
