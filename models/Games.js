const mongoose = require("mongoose");
const {
  checkObj,
  currentDate,
  check,
  checkIsString,
  setDataType,
} = require("../helpers");
const { PAGINATION_DEFAULT_LIMIT } = require("../config");

const gameSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    default: 1,
  },
  period: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  invest_price: {
    type: String,
    default: 0,
  },
  date: {
    type: Number,
    default: 0,
  },
  begintime: {
    type: Number,
    default: 0,
  },
  unit: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    default: 0,
  },
  detail: {
    set_unit: { type: Number, default: 0 },
    set_value: { type: Number, default: 0 },
  },
});

const Game = (module.exports = mongoose.model("Game", gameSchema));
module.exports = mongoose.model("Game", gameSchema);

module.exports.gameById = async function (object) {
  let selected = checkObj(object, "selected")
    ? object.selected
    : ["date", "begintime", "period", "price", "unit"];
  if (check(object.id) && checkIsString(object.id)) {
    return await Game.findOne({ _id: object.id })
      .select(selected)
      .exec()
      .then((result) => {
        return JSON.parse(JSON.stringify(result));
      });
  } else {
    return await Game.findOne()
      .select(selected)
      .sort({ _id: -1 })
      .skip(object.id)
      .exec()
      .then((result) => {
        return JSON.parse(JSON.stringify(result));
      });
  }
};

module.exports.findAllGame = async function (input = {}) {
  return await Game.find(input).sort({ _id: -1 }).exec();
};

module.exports.gameOfDashboard = async function (input) {
  let limit = checkObj(input, "limit") ? input.limit : PAGINATION_DEFAULT_LIMIT;
  return await Game.find({ status: 1 })
    .select(["date", "begintime", "period", "price", "unit"])
    .skip(setDataType(input.page, "n") * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

module.exports.countOfGame = async function () {
  return await Game.countDocuments();
};

module.exports.updateGame = async function (input, update) {
  let data = await Game.findOneAndUpdate({ _id: input }, update, {
    new: true,
    upsert: true,
  });
  return data;
};

module.exports.saveGame = async function (input) {
  const res = new Game(input);
  await res.save();
  return res;
};

module.exports.removeGame = async function (input) {
  return await Game.deleteMany(input);
};
