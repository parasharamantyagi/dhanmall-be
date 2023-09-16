const { GDM_MODULE } = require("./../config");
const mongoose = GDM_MODULE.mongoose;

const OtpVerificationSchema = new mongoose.Schema({
  mobile: {
    type: String,
    unique: true,
    required: false,
  },
  verification_code: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  }
});

const OtpVerification = (module.exports = mongoose.model('otp_verifications', OtpVerificationSchema));
module.exports = mongoose.model("otp_verifications", OtpVerificationSchema);


module.exports.saveOtpVerification = async function (input) {
  const res = new OtpVerification(input);
  let result = await res.save();
  return result;
}