const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../config');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const { colors1, colors2, contract_type } = require("../providers/colors");

exports.homeScreen = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 1, data: {
        colors1: colors1,
        colors2: colors2,
        contract_type: contract_type,
      }
    });
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
}


exports.verifyNumber = async (req, res, next) => {
  try {
    const inputData = req.body;

    client.messages
      .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+12566701744',
        to: `+917347332511`
      })
      .then(message => console.log(message.sid))
      .done();

    // const user = new userModel({ name: 'aman tyagi', age: 30 });
    // await user.save();
    // let response = { message: 'Welcome this is first app' };
    // const users = await userModel.find({});

    return res.status(200).json(inputData);
  } catch (e) {
    return res.json({ status: 0, message: e.message });
  }
}