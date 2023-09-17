const { setDataType } = require("../helpers");
const { GDM_MODULE } = require("./../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

const my_childrens = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  childrens_id: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  water_reward: {
    type: Float,
    default: 0,
  },
  first_reward: {
    type: Float,
    default: 0,
  },
  type: {
    type: String,
    enum: ["lavel_1", "lavel_2", "lavel_3", "lavel_4"],
    default: "lavel_1",
  },
});

const MyChildrens = (module.exports = mongoose.model(
  "my_childrens",
  my_childrens
));

module.exports.saveMyChildren = async function (input) {
  const res = new MyChildrens(input);
  let result = await res.save();
  return result;
};

module.exports.getMyChildren = async function (inputData) {
  return await MyChildrens.find(inputData).exec();
};

module.exports.updateMyChildren = async function (id, inputData) {
  try {
    let result = await MyChildrens.findOneAndUpdate({ _id: setDataType(id, "s") }, inputData, {
      upsert: true, // Create the document if it doesn't exist
      new: true, // Return the modified document as the result
    });
    // console.log(okkkk);
    return result;
  } catch (error) {
    return error;
  }
};
