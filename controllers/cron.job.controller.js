const { currentDate, checkObj, filterArrayKey, arrayOfObject, sum_of_array, checkArray } = require("../helpers");
const { saveGame, gameById, updateGame } = require("../models/Games");
const { getOrderCalculation } = require("../models/OrderCalculation");
const { orderByGameId } = require("../models/Orders");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById();
    if (checkObj(gameId)) {
      let all_orders = await getOrderCalculation(gameId._id.toString());
      let pick_red = arrayOfObject(all_orders, { pick: 'red' }, Array);
      let pick_green = arrayOfObject(all_orders, { pick: 'green' }, Array);
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

      let red_color_price = filterArrayKey(pick_red, 'delivery');
      let green_color_price = filterArrayKey(pick_green, 'delivery');
      red_color_price = checkArray(red_color_price) ? sum_of_array(red_color_price) : 0;
      green_color_price = checkArray(green_color_price) ? sum_of_array(green_color_price) : 0;
      let color_data = red_color_price > green_color_price ? 'green' : 'red';
      updateGame(gameId._id.toString(), { status: 1, unit: 7, color: color_data });
    }
    let periodNu = checkObj(gameId) ? gameId.period + 1 : 100000001;
    saveGame({ period: periodNu, project_id: 1, price: 1145 ,date: currentDate()});

    return res.status(200).json(true);

  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
}