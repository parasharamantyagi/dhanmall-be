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
  date: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const OtpVerification = (module.exports = mongoose.model(
  "otp_verifications",
  OtpVerificationSchema
));

module.exports.saveOtpVerification = async function (input) {
  console.log(input);
  try {
    let findAndCheck = await OtpVerification.findOne({ mobile: input.mobile });
    if (check(findAndCheck)) {
      const result = await OtpVerification.findOneAndUpdate(
        { _id: setDataType(findAndCheck._id, "string") },
        { verification_code: input.verification_code, date: input.date },
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
