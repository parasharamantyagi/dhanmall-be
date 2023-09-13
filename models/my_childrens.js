const { GDM_MODULE } = require("./../config");
const mongoose = GDM_MODULE.mongoose;
var Float = GDM_MODULE.mongooseFloat.loadType(mongoose);

const my_childrens = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
  },
  my_promotion_code: {
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
