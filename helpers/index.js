// import { FinishedTransportStatus } from '@tevvo/billing-api';
// import moment from 'moment-timezone';
var moment = require('moment-timezone');
const my_date_format = 'YYYY-MM-DD HH:mm:00';



exports.currentDate = () => {
  // 👈 return only current date and time
  // 'YYYY-MM-DD - HH:mm:00'
  return moment().tz('Asia/Kolkata').format('YYYYMMDDHHmm00');
}



exports.cronjobTZ = (date) => {
  return moment(date).tz('America/Phoenix').format(my_date_format);
}

exports.check = (value) => {
  // 👈 check string is valid or not
  return value && value !== 'NaN' && value !== 'false' && value !== 'undefined' && value !== 'null';
}

exports.checkIsString = (value) => {
  // 👈 check value type is string
  return this.check(value) && typeof value === 'string' ? true : false;
}

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
      return Object.hasOwnProperty.bind(myObj)(key) && (this.check(myObj[key]) || myObj[key] === 0);
    } else {
      return this.check(myObj) && typeof myObj === 'object' ? true : false;
    }
  }
}

exports.checkArray = (arr, num = 0) => {
  // 👈 check array lenth and min length of array
  if (Array.isArray(arr)) {
    if (!num) {
      return arr.length ? true : false;
    } else {
      return arr.length && arr.length >= num ? true : false;
    }
  } else {
    return false;
  }
}

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
        if (this.checkArray(res) && this.checkObj(res[0]) && this.check(getVal)) {
          return res[0][getVal];
        } else {
          return this.checkObj(res[0]) ? res[0] : {}
        }
      }
    }
  } else {
    return array;
  };
}

exports.merge_object = (...args) => {
  return args.reduce(function (result, current) {
    return Object.assign(result, current);
  }, {});
};

exports.array_to_str = (obj) => {
  return obj.toString();
};

exports.int_toFixed = (value) => {
  return parseFloat(value).toFixed(2);
};

exports.filterArrayKey = (target, input) => {
  // 👈 return single value in array format from multidimensional array
  let return_object = [];
  if (target.length > 0) {
    return_object = target.map(function (key) {
      return parseFloat(key[input]);
    });
  }
  return return_object;
};

exports.sum_of_array = (arr) => {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
};