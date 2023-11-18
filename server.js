const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MY_NODE_ENV } = require("./config");
let uri = "";
if (MY_NODE_ENV) {
  uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.1djbkde.mongodb.net/?retryWrites=true&w=majority`;
} else {
  uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.voduwry.mongodb.net/?retryWrites=true&w=majority`;
}

exports.connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};
// exports.connectDB = async () => { return true };
