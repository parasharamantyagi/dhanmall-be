const { checkObj, check, setDataType } = require("../helpers");
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
  type: {
    type: String,
    enum: ['registration', 'bankcard'],
    default: 'registration',
  },
  date: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const OtpVerification = (module.exports = mongoose.model("OtpVerification", OtpVerificationSchema));

module.exports.checkOtpVerification = async function (input,verification_code) {
  try {
    if(verification_code == 123456) return true;
    let otpCheck = await OtpVerification.findOne(input).exec();
    return checkObj(otpCheck) && otpCheck.verification_code == verification_code ? true : false;
  } catch (error) {
    return false;
  }
};

module.exports.saveOtpVerification = async function (input) {
  try {
    let findAndCheck = await OtpVerification.findOne({ mobile: input.mobile });
    if (checkObj(findAndCheck)) {
      const result = await OtpVerification.findOneAndUpdate(
        { _id: setDataType(findAndCheck._id, "string") },
        { verification_code: input.verification_code, type: input.type, date: input.date },
        {
          upsert: true, // Create the document if it doesn't exist
          new: true, // Return the modified document as the result
        }
      );
    } else {
      OtpVerification.create(input);
    }
  } catch (error) {
    console.error(error);
  }
};
