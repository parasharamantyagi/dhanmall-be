const { CRYPTOJS_SECRET, JWT_ACCESS_TOKEN, GDM_MODULE } = require("../config");
const { CryptoJS, jwt } = GDM_MODULE;

exports.encrypted = (val) => {
  // 👈 check array lenth and min length of array
  val = JSON.stringify(val);
  return CryptoJS.AES.encrypt(val, CRYPTOJS_SECRET).toString();
};

exports.dencrypted = (ciphertext) => {
  try {
    let bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTOJS_SECRET);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText) {
      return JSON.parse(originalText);
    }
    return new Object();
  } catch (err) {
    return err;
  }
};

exports.promotionCode = () => {
  let length = 8;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.setJWT = (inputData) => {
  return jwt.sign(inputData, JWT_ACCESS_TOKEN);
};
