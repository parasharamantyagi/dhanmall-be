const { GDM_MODULE } = require("../config");
const {
  filterArrayKey,
  arrayOfObject,
  sum_of_array,
  setDataType,
  array_to_str,
} = require("../helpers");
const { colors2 } = require("./colors");

module.exports.calCulationNumberPridiction = (all_orders) => {
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

  let price_pick_red = sum_of_array(filterArrayKey(pick_red, "delivery"));
  let price_pick_green = sum_of_array(filterArrayKey(pick_green, "delivery"));
  let price_pick_violet = sum_of_array(filterArrayKey(pick_violet, "delivery"));
  let price_pick_0 = sum_of_array(filterArrayKey(pick_0, "delivery"));
  let price_pick_1 = sum_of_array(filterArrayKey(pick_1, "delivery"));
  let price_pick_2 = sum_of_array(filterArrayKey(pick_2, "delivery"));
  let price_pick_3 = sum_of_array(filterArrayKey(pick_3, "delivery"));
  let price_pick_4 = sum_of_array(filterArrayKey(pick_4, "delivery"));
  let price_pick_5 = sum_of_array(filterArrayKey(pick_5, "delivery"));
  let price_pick_6 = sum_of_array(filterArrayKey(pick_6, "delivery"));
  let price_pick_7 = sum_of_array(filterArrayKey(pick_7, "delivery"));
  let price_pick_8 = sum_of_array(filterArrayKey(pick_8, "delivery"));
  let price_pick_9 = sum_of_array(filterArrayKey(pick_9, "delivery"));

  let total_Red_delivery = sum_of_array([
    price_pick_red,
    price_pick_2,
    price_pick_4,
    price_pick_6,
    price_pick_8,
  ]);
  let total_Green_delivery = sum_of_array([
    price_pick_green,
    price_pick_1,
    price_pick_3,
    price_pick_7,
    price_pick_9,
  ]);
  let total_Violet_delivery = sum_of_array([price_pick_violet]);
  let total_Red_Violet_delivery = sum_of_array([price_pick_0]);
  let total_Green_Violet_delivery = sum_of_array([price_pick_5]);

  let unit = 2;

  if (total_Red_delivery < total_Green_delivery) {
    if (
      price_pick_2 <= price_pick_4 &&
      price_pick_2 <= price_pick_6 &&
      price_pick_2 <= price_pick_8
    ) {
      unit = 2;
    } else if (
      price_pick_4 <= price_pick_2 &&
      price_pick_4 <= price_pick_6 &&
      price_pick_4 <= price_pick_8
    ) {
      unit = 4;
    } else if (
      price_pick_6 <= price_pick_2 &&
      price_pick_6 <= price_pick_4 &&
      price_pick_6 <= price_pick_8
    ) {
      unit = 6;
    } else if (
      price_pick_8 <= price_pick_2 &&
      price_pick_8 <= price_pick_4 &&
      price_pick_8 <= price_pick_6
    ) {
      unit = 8;
    }
  } else if (total_Red_delivery > total_Green_delivery) {
    if (
      price_pick_1 <= price_pick_3 &&
      price_pick_1 <= price_pick_7 &&
      price_pick_1 <= price_pick_9
    ) {
      unit = 1;
    } else if (
      price_pick_3 <= price_pick_1 &&
      price_pick_3 <= price_pick_7 &&
      price_pick_3 <= price_pick_9
    ) {
      unit = 3;
    } else if (
      price_pick_7 <= price_pick_1 &&
      price_pick_7 <= price_pick_3 &&
      price_pick_7 <= price_pick_9
    ) {
      unit = 7;
    } else if (
      price_pick_9 <= price_pick_1 &&
      price_pick_9 <= price_pick_3 &&
      price_pick_9 <= price_pick_7
    ) {
      unit = 9;
    }
  } else {

  }

  
  let otp = GDM_MODULE.rn({ min: 1222, max: 1599, integer: true });
  let calPrice = setDataType(otp, "s") + setDataType(unit, "s");
  calPrice = setDataType(calPrice, "n");

  let color = arrayOfObject(colors2, { id: unit }, "colour");

  // let red_color_price = filterArrayKey(pick_red, 'delivery');
  // let green_color_price = filterArrayKey(pick_green, 'delivery');

  // red_color_price = checkArray(red_color_price) ? sum_of_array(red_color_price) : 0;
  // green_color_price = checkArray(green_color_price) ? sum_of_array(green_color_price) : 0;
  // let color_data = red_color_price > green_color_price ? 'green' : 'red';
  // return {total_Red_delivery, total_Green_delivery,  total_Violet_delivery, total_Red_Violet_delivery, total_Green_Violet_delivery};

  return {
    status: 1,
    unit: unit,
    price: calPrice,
    color: array_to_str(color),
    // data: {
    //   color: {
    //     total_Red_delivery,
    //     total_Green_delivery,
    //     total_Violet_delivery,
    //     total_Red_Violet_delivery,
    //     total_Green_Violet_delivery,
    //   },
    //   number: {
    //     pick_0: price_pick_0,
    //     pick_1: price_pick_1,
    //     pick_2: price_pick_2,
    //     pick_3: price_pick_3,
    //     pick_4: price_pick_4,
    //     pick_5: price_pick_5,
    //     pick_6: price_pick_6,
    //     pick_7: price_pick_7,
    //     pick_8: price_pick_8,
    //     pick_8: price_pick_9,
    //   },
    // },
  };
};
