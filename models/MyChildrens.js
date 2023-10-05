const { setDataType, checkObj } = require("../helpers");
const { GDM_MODULE, PAGINATION_DEFAULT_LIMIT } = require("../config");
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
    enum: ["lavel_1", "lavel_2", "lavel_3", "lavel_4", "lavel_5"],
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

module.exports.countMyChildren = async function (inputData) {
  return await MyChildren.find(inputData).countDocuments();
};

module.exports.getMyChildren = async function (inputData, obj = {page: 0}) {

  let limit = checkObj(inputData, "limit") ? inputData.limit : PAGINATION_DEFAULT_LIMIT;
  return await MyChildren.find(inputData)
    .populate({ path: "childrens_id", select: "nickname mobile" })
    .skip(setDataType(obj.page, "n") * limit)
    .limit(limit)
    .sort({ _id: -1 })
    .exec();
};

module.exports.updateMyChildren = async function (id, inputData) {
  try {
    let result = await MyChildren.updateOne({ _id: setDataType(id, "s") }, { $inc: inputData });
    return result;
  } catch (error) {
    return error;
  }
};
module.exports.MyChildren = mongoose.model("MyChildren", my_childrens);
