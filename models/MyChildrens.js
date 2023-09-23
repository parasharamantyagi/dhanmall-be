const { setDataType } = require("../helpers");
const { GDM_MODULE } = require("../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

const my_childrens = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  childrens_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const MyChildren = (module.exports = mongoose.model(
  "MyChildren",
  my_childrens
));

module.exports.saveMyChildren = async function (input) {
  const res = new MyChildren(input);
  let result = await res.save();
  return result;
};

module.exports.getMyChildren = async function (inputData) {
  return await MyChildren.find(inputData)
    .populate({ path: "childrens_id", select: "nickname mobile" })
    .exec();
};

module.exports.updateMyChildren = async function (id, inputData) {
  try {
    let result = await MyChildren.findOneAndUpdate(
      { _id: setDataType(id, "s") },
      inputData,
      {
        upsert: true, // Create the document if it doesn't exist
        new: true, // Return the modified document as the result
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
module.exports.MyChildren = mongoose.model("MyChildren", my_childrens);
