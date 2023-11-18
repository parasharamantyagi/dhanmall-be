// import { FinishedTransportStatus } from '@tevvo/billing-api';
// import moment from 'moment-timezone';
var moment = require("moment-timezone");
const my_date_format = "YYYY-MM-DD HH:mm:00";

exports.check = (value) => {
  // 👈 check string is valid or not
  return (
    value &&
    value !== "" &&
    value !== "NaN" &&
    value !== "false" &&
    value !== "undefined" &&
    value !== "null"
  );
};

exports.todayDate = (date = 0) => {
  // 👈 return only current date and time
  let today = moment();
  if(this.check(date)){
    today = today.subtract(Math.abs(date), "days");
  }
  return today.tz("Asia/Kolkata").format("YYYYMMDD");
};

exports.lastMonthDate = () => {
  // 👈 return only current date and time
  let currentDate = moment();
  let lastMonthDate = currentDate.subtract(1, "months");
  return lastMonthDate.unix();
};

exports.lastDateByDays = (days = 1, type = "") => {
  // 👈 return only current date and time
  var now = new Date(); // now
  if(type === 'first'){
    now.setHours(0); // set hours to 0
    now.setMinutes(1); // set minutes to 0
    now.setSeconds(0); // set seconds to 0
  }else if(type === 'last'){
    now.setHours(23); // set hours to 0
    now.setMinutes(59); // set minutes to 0
    now.setSeconds(59); // set seconds to 0
  }
  let currentDate = moment(now);
  let lastMonthDate = currentDate.subtract(days, "days");
  return lastMonthDate.unix();
};

exports.currentDate = () => {
  // 👈 return only current date and time
  // 'YYYY-MM-DD - HH:mm:00'
  return moment().tz("Asia/Kolkata").unix();
};

exports.currentDate2 = () => {
  // 👈 return only current date and time
  // 'YYYY-MM-DD - HH:mm:00'
  return moment().tz("Europe/London").unix();
};

exports.cronjobTZ = (date) => {
  return moment(date).tz("America/Phoenix").format(my_date_format);
};

exports.find_one = (inputArray, my_key = null) => {
  // 👈 return single value from array default return first
  let response = Object();
  if (inputArray.length) {
    response = inputArray.find(Boolean);
    if (my_key) {
      return inputArray[my_key];
    }
  }
  return response;
};



exports.checkIsString = (value) => {
  // 👈 check value type is string
  return this.check(value) && typeof value === "string" ? true : false;
};

exports.checkObj = (myObj, key = null) => {
  // 👈 check object is valid and check key is exit in object
  if (
    (myObj &&
      Object.keys(myObj).length === 0 &&
      Object.getPrototypeOf(myObj) === Object.prototype) ||
    Array.isArray(myObj)
  ) {
    return false;
  } else {
    if (key) {
      return (
        Object.hasOwnProperty.bind(myObj)(key) &&
        (this.check(myObj[key]) || myObj[key] === 0)
      );
    } else {
      return this.check(myObj) && typeof myObj === "object" ? true : false;
    }
  }
};

exports.checkArray = (arr, num = 0) => {
  // 👈 check array lenth and min length of array
  if (Array.isArray(arr)) {
    if (!num) {
      return arr.length ? true : false;
    } else {
      return arr.length && arr.length === num ? true : false;
    }
  } else {
    return false;
  }
};

exports.objectFormat = (obj = {}, keys = []) => {
  let return_obj = {};
  let object_key;
  if (this.checkArray(keys)) {
    keys.map((key) => {
      if (this.checkObj(obj, key)) {
        return_obj[key] = obj[key];
      } else {
        if (this.checkObj(key)) {
          object_key = Object.keys(key)[0];
          return_obj[object_key] = this.checkObj(obj, object_key)
            ? obj[object_key]
            : key[object_key];
        }
      }
    });
  } else {
    return_obj = obj;
  }
  return return_obj;
};

exports.arrayOfObject = (array, Obj, getVal) => {
  if (this.checkArray(array) && this.checkObj(Obj)) {
    let res = array.filter(function (item) {
      for (let key in Obj) {
        if (Array.isArray(Obj[key]) && Obj[key].length) {
          return Obj[key].includes(item[key]) ? true : false;
        } else {
          if (item[key] === undefined || item[key] != Obj[key]) return false;
        }
      }
      return true;
    });
    if (this.check(getVal) && getVal === Array) {
      return res;
    } else {
      if (this.check(getVal) && getVal === true) {
        return this.checkArray(res);
      } else {
        if (
          this.checkArray(res) &&
          this.checkObj(res[0]) &&
          this.check(getVal)
        ) {
          return res[0][getVal];
        } else {
          return this.checkObj(res[0]) ? res[0] : {};
        }
      }
    }
  } else {
    return array;
  }
};

exports.merge_object = (...args) => {
  return args.reduce(function (result, current) {
    return Object.assign(result, current);
  }, {});
};

exports.array_to_str = (obj) => {
  return obj.toString();
};

exports.str_to_array = (obj) => {
  return obj.split(",");
};

exports.int_toFixed = (value) => {
  return parseFloat(value).toFixed(2);
};

exports.filterArrayKey = (target, input) => {
  // 👈 return single value in array format from multidimensional array
  let return_object = [];
  if (target.length > 0) {
    return_object = target.map(function (key) {
      return key[input];
    });
  }
  return return_object;
};



exports.sum_of_array = (arr) => {
  if(this.checkArray(arr)){
    return arr.reduce(function (a, b) {
      return a + b;
    }, 0);
  }else{
    return 0;
  }
};

exports.setDataType = (value, type) => {
  switch (type) {
    case "number":
      return parseInt(value);
    case "int":
      return parseInt(value);
    case "n":
      return parseInt(value);
    case "string":
      return value.toString();
    case "s":
      return value.toString();
    case "float":
      return parseFloat(value);
    case "f":
      return parseFloat(value);
    case "u":
      return value.toUpperCase();
    case "l":
      return value.toLowerCase();
    case "padStart":
      return String(value).padStart(3, "0");
    default:
      return value;
  }
};

exports.gameNowTime = () => {
  const currentTimestamp = Date.now();
  // Convert it to seconds
  const currentSeconds = Math.floor(currentTimestamp / 1000);
  // Calculate the current second within the 180-second cycle
  const secondInCycle = currentSeconds % 180;
  return 180 - secondInCycle;
};

exports.todayCurrentMinutes = () => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return this.setDataType(currentMinutes / 3, "int");
};

exports.removeFirstThreeCharacters = (inputString) => {
  return inputString.substring(3);
};

exports.getSmallerAmount = (arrayOfObjects) => {
  let smallestValue = Infinity; // Initialize with a large value
  let smallestObjects = [];
  for (const obj of arrayOfObjects) {
    if (
      typeof obj.value === "number" &&
      !isNaN(obj.value) &&
      obj.value === smallestValue
    ) {
      smallestObjects.push(obj);
    } else if (
      typeof obj.value === "number" &&
      !isNaN(obj.value) &&
      obj.value < smallestValue
    ) {
      smallestValue = obj.value;
      smallestObjects = [obj];
    }
  }
  return this.filterArrayKey(smallestObjects, "no");
};

exports.getHelperGameContribution = (target) => {
  // 👈 return single value in array format from multidimensional array
  let game_total_contribution = [];
  let game_winner_contribution = [];
  let game_total_pick = [];
  // let all_user = [];
  if (target.length > 0) {
    return_object = target.map(function (key) {
      // all_user.push(key.user_id._id.toString());
      game_total_contribution.push(key.user_id.game_total_contribution);
      game_winner_contribution.push(key.user_id.game_winner_contribution);
      game_total_pick.push(key.user_id.game_total_pick);
    });
  }
  return {
    game_total_contribution: this.sum_of_array(game_total_contribution),
    game_winner_contribution: this.sum_of_array(game_winner_contribution),
    game_total_pick: this.sum_of_array(game_total_pick),
  };
};

exports.isPositiveNumber = (number) =>
  number > 0 ? true : number < 0 ? false : false;
exports.changePositiveNumber = (number) => Math.abs(number);
