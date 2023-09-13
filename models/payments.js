const mongoose = require("mongoose");
const { currentDate } = require("../helpers");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  ammount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["created"],
    default: "created",
  },
  date: {
    type: Number,
    default: currentDate(),
  },
});

const Payment = (module.exports = mongoose.model("payments", paymentSchema));
module.exports = mongoose.model("payments", paymentSchema);

module.exports.savePayment = async function (input) {
  const res = new Payment(input);
  let result = await res.save();
  return result;
};
