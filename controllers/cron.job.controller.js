const { currentDate, checkObj, filterArrayKey, arrayOfObject, sum_of_array, checkArray } = require("../helpers");
const { saveGame, gameById, updateGame } = require("../models/games");
const { getOrderCalculation } = require("../models/orderCalculation");
const { orderByGameId } = require("../models/orders");

exports.gameInterval = async (req, res, next) => {
  try {
    let gameId = await gameById();
    if (checkObj(gameId)) {
      let all_orders = await getOrderCalculation(gameId._id.toString());
      let redResult = arrayOfObject(all_orders, { pick: 'red' }, Array);
      let greenResult = arrayOfObject(all_orders, { pick: 'green' }, Array);

      let red_color_price = filterArrayKey(redResult, 'delivery');
      let green_color_price = filterArrayKey(greenResult, 'delivery');
      red_color_price = checkArray(red_color_price) ? sum_of_array(red_color_price) : 0;
      green_color_price = checkArray(green_color_price) ? sum_of_array(green_color_price) : 0;
      let color_data = red_color_price > green_color_price ? 'green' : 'red';
      updateGame(gameId._id.toString(), { status: 1, unit: 7, color: color_data });
    }
    let periodNu = checkObj(gameId) ? gameId.period + 1 : 100000001;
    saveGame({ period: periodNu, project_id: 1, price: 1145 });

    return res.status(200).json({ red: red_color_price, green: green_color_price });

  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
}