const mongoose = require("mongoose");
const { checkObj, currentDate, check } = require("../helpers");

const gameSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    default: 1,
  },
  period: {
    type: Number,
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
    default: currentDate(),
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
});

const Game = (module.exports = mongoose.model('games', gameSchema));
module.exports = mongoose.model("games", gameSchema);

module.exports.gameById = async function (id = '') {
  if (check(id)) {
    return await Game.findOne({ _id: id }).exec().then((result) => {
      return JSON.parse(JSON.stringify(result));
    });
  } else {
    return await Game.findOne({}, {}, { sort: { _id: -1 } }).exec().then((result) => {
      return JSON.parse(JSON.stringify(result));
    });
  }
}

module.exports.gameOfDashboard = async function (input) {
  let limit = checkObj(input, 'limit') ? input.limit : 10;
  let skip = checkObj(input, 'page') ? (input.page - 1) * 10 : 0;
  return await Game.find({ status: 1 }).skip(skip).limit(limit).sort({ _id: -1 });
}

module.exports.countOfGame = async function () {
  return await Game.countDocuments();
}

module.exports.updateGame = async function (input, update) {
  let data = await Game.findOneAndUpdate({ _id: input }, update, {
    new: true,
    upsert: true
  });
  return data;
}

module.exports.saveGame = async function (input) {
  const res = new Game(input);
  await res.save();
  return true;
}

