const { CRYPTOJS_SECRET, GDM_MODULE } = require('../config');
const { CryptoJS } = GDM_MODULE;


exports.encrypted = (val) => {
  // 👈 check array lenth and min length of array
  val = JSON.stringify(val);
  return CryptoJS.AES.encrypt(val, CRYPTOJS_SECRET).toString();
}


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
}
