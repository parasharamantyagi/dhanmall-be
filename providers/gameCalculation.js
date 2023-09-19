const { GDM_MODULE } = require("../config");
const { filterArrayKey, arrayOfObject, sum_of_array, setDataType } = require("../helpers");

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

  let price_pick_red = filterArrayKey(pick_red, "delivery");
  let price_pick_green = filterArrayKey(pick_green, "delivery");
  let price_pick_violet = filterArrayKey(pick_violet, "delivery");
  let price_pick_0 = filterArrayKey(pick_0, "delivery");
  let price_pick_1 = filterArrayKey(pick_1, "delivery");
  let price_pick_2 = filterArrayKey(pick_2, "delivery");
  let price_pick_3 = filterArrayKey(pick_3, "delivery");
  let price_pick_4 = filterArrayKey(pick_4, "delivery");
  let price_pick_5 = filterArrayKey(pick_5, "delivery");
  let price_pick_6 = filterArrayKey(pick_6, "delivery");
  let price_pick_7 = filterArrayKey(pick_7, "delivery");
  let price_pick_8 = filterArrayKey(pick_8, "delivery");
  let price_pick_9 = filterArrayKey(pick_9, "delivery");

  let total_Red_delivery =
    sum_of_array(price_pick_red) +
    sum_of_array(price_pick_2) +
    sum_of_array(price_pick_4) +
    sum_of_array(price_pick_6) +
    sum_of_array(price_pick_8);
  let total_Green_delivery =
    sum_of_array(price_pick_green) +
    sum_of_array(price_pick_1) +
    sum_of_array(price_pick_3) +
    sum_of_array(price_pick_7) +
    sum_of_array(price_pick_9);
  let total_Violet_delivery = sum_of_array(price_pick_violet);
  let total_Red_Violet_delivery = sum_of_array(price_pick_0);
  let total_Green_Violet_delivery = sum_of_array(price_pick_5);

  let unit = 0;
  let color = "red";
  if (total_Red_delivery >= total_Green_delivery) {
    color = "green";
  }

  if (total_Red_delivery < total_Green_delivery) {
    if (
      sum_of_array(price_pick_2) < sum_of_array(price_pick_4) &&
      sum_of_array(price_pick_2) < sum_of_array(price_pick_6) &&
      sum_of_array(price_pick_2) < sum_of_array(price_pick_8)
    ) {
      unit = 2;
    }
    if (
      sum_of_array(price_pick_4) < sum_of_array(price_pick_2) &&
      sum_of_array(price_pick_4) < sum_of_array(price_pick_6) &&
      sum_of_array(price_pick_4) < sum_of_array(price_pick_8)
    ) {
      unit = 4;
    }
    if (
      sum_of_array(price_pick_6) < sum_of_array(price_pick_2) &&
      sum_of_array(price_pick_6) < sum_of_array(price_pick_4) &&
      sum_of_array(price_pick_6) < sum_of_array(price_pick_8)
    ) {
      unit = 6;
    }
    if (
      sum_of_array(price_pick_8) < sum_of_array(price_pick_2) &&
      sum_of_array(price_pick_8) < sum_of_array(price_pick_4) &&
      sum_of_array(price_pick_8) < sum_of_array(price_pick_6)
    ) {
      unit = 8;
    }
  }

  if (total_Red_delivery > total_Green_delivery) {
    if (
      sum_of_array(price_pick_1) < sum_of_array(price_pick_3) &&
      sum_of_array(price_pick_1) < sum_of_array(price_pick_7) &&
      sum_of_array(price_pick_1) < sum_of_array(price_pick_9)
    ) {
      unit = 1;
    }
    if (
      sum_of_array(price_pick_3) < sum_of_array(price_pick_1) &&
      sum_of_array(price_pick_3) < sum_of_array(price_pick_7) &&
      sum_of_array(price_pick_3) < sum_of_array(price_pick_9)
    ) {
      unit = 3;
    }
    if (
      sum_of_array(price_pick_7) < sum_of_array(price_pick_1) &&
      sum_of_array(price_pick_7) < sum_of_array(price_pick_3) &&
      sum_of_array(price_pick_7) < sum_of_array(price_pick_9)
    ) {
      unit = 7;
    }
    if (
      sum_of_array(price_pick_9) < sum_of_array(price_pick_1) &&
      sum_of_array(price_pick_9) < sum_of_array(price_pick_3) &&
      sum_of_array(price_pick_9) < sum_of_array(price_pick_7)
    ) {
      unit = 9;
    }
  }
  let otp = GDM_MODULE.rn({ min: 1222, max: 1599, integer: true });
  let calPrice = setDataType(otp,'s') + setDataType(unit,'s');
  calPrice = setDataType(calPrice,'n');

  // let red_color_price = filterArrayKey(pick_red, 'delivery');
  // let green_color_price = filterArrayKey(pick_green, 'delivery');

  // red_color_price = checkArray(red_color_price) ? sum_of_array(red_color_price) : 0;
  // green_color_price = checkArray(green_color_price) ? sum_of_array(green_color_price) : 0;
  // let color_data = red_color_price > green_color_price ? 'green' : 'red';
  // return {total_Red_delivery, total_Green_delivery,  total_Violet_delivery, total_Red_Violet_delivery, total_Green_Violet_delivery};
  return { status: 1, unit: unit, price: calPrice, color: color };
};
