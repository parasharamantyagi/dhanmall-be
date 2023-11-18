const { GDM_MODULE, GDM_CHARGES_FEE } = require("../config");
const {
  arrayOfObject,
  setDataType,
  array_to_str,
  checkObj,
  filterArrayKey,
  sum_of_array,
  checkArray,
  getSmallerAmount,
  check,
  getHelperGameContribution,
} = require("../helpers");
const { colors2 } = require("./colors");

const last_five_transaction = (prevGameOrders) => {
  return (
    setDataType(prevGameOrders.invest_price, "f") -
    setDataType(prevGameOrders.delivery_price, "f")
  );
  // return sum_of_array(
  //   filterArrayKey(
  //     filterArrayKey(prevGameOrders, "game_budget"),
  //     "total_amount"
  //   )
  // ) -
  // sum_of_array(
  //   filterArrayKey(
  //     filterArrayKey(prevGameOrders, "game_budget"),
  //     "total_delivery"
  //   )
  // )
};

const calWithuserOrders = (userOrders) => {
  if (checkArray(userOrders, 1)) {
    if (
      userOrders[0].user_id.game_winner_contribution < 50 &&
      userOrders[0].invest < 50
    ) {
      if (userOrders[0].type === 1) {
        if (userOrders[0].pick === "red") {
          return {
            status: true,
            unitArray: [2, 4, 6, 8],
          };
        } else if (userOrders[0].pick === "green") {
          return {
            status: true,
            unitArray: [1, 3, 7, 9],
          };
        }
      } else if (userOrders[0].type === 2) {
        return {
          status: true,
          unitArray: [setDataType(userOrders[0].pick, "n")],
        };
      }
    }
  }
  return {
    status: false,
    unitArray: [],
  };
};

const setFixGameUnit = ({ game, gameOrder, userOrders }) => {
  let response = {
    status: false,
  };
  if (checkObj(game, "detail") && check(game.detail.set_unit)) {
    response = {
      status: true,
      unit: [game.detail.set_value],
    };
  } else if (calWithuserOrders(userOrders).status) {
    response = {
      status: true,
      unit: calWithuserOrders(userOrders).unitArray,
    };
  }else if(userOrders.length < 3){
    let gameContribution = getHelperGameContribution(userOrders);
    if(checkObj(gameContribution,'game_total_contribution') && checkObj(gameContribution,'game_winner_contribution') && checkObj(gameContribution,'game_total_pick')){
      console.log(gameContribution.game_winner_contribution);
      console.log(gameContribution.game_total_contribution);
      console.log(gameContribution.game_total_pick);
      if(gameContribution.game_winner_contribution < (gameContribution.game_total_contribution / (gameContribution.game_total_pick * 0.3))){
        if(gameOrder.total_price.total_delivery < 70){
            if(userOrders[0].type === 1){
              if(userOrders[0].pick === 'green'){
                response = {
                  status: true,
                  unit: [1,3,7,9]
                };
              }else if(userOrders[0].pick === 'red'){
                response = {
                  status: true,
                  unit: [2,4,6,8]
                };
              }
            }
        }
      }
    }
  }
  return response;
};

module.exports.calCulationNumberPridiction = ({
  game,
  gameOrder,
  prevGameOrders,
  userOrders = [],
}) => {
  let unit = GDM_MODULE.rn({ min: 0, max: 9, integer: true });
  let unitArray = [];
  if (setDataType(gameOrder.game_id._id, "s") === setDataType(game._id, "s") && checkArray(userOrders)) {
    let fixUnit = setFixGameUnit({ game, gameOrder, userOrders });
    if (check(fixUnit.status)) {
      unitArray = fixUnit.unit;
    } else {
      if (gameOrder.total_price.total_amount * 2 > gameOrder.total_price.total_delivery) {
        // if (gameOrder.total_price.total_delivery < last_five_transaction(prevGameOrders)) {
        //   if (gameOrder.pick_red.total_delivery < gameOrder.pick_green.total_delivery) {
        //     unitArray.push(1); // green pick
        //     unitArray.push(3);
        //     unitArray.push(7);
        //     unitArray.push(9);
        //   } else {
        //     unitArray.push(2); // red pick
        //     unitArray.push(4);
        //     unitArray.push(6);
        //     unitArray.push(8);
        //   }
        // } else {
          if (gameOrder.pick_red.total_delivery < gameOrder.pick_green.total_delivery) {
            if (gameOrder.pick_red.total_delivery < gameOrder.pick_green.total_delivery / 2) {
              unitArray.push(2); // red pick
              unitArray.push(4);
              unitArray.push(6);
              unitArray.push(8);
            } else {
              unitArray.push(0);
            }
          } else {
            if ( gameOrder.pick_red.total_delivery / 2 > gameOrder.pick_green.total_delivery) {
              unitArray.push(1); // green pick
              unitArray.push(3);
              unitArray.push(7);
              unitArray.push(9);
            } else {
              unitArray.push(5);
            }
          }
        // }
      } else {
        const getVal = [
          {
            no: 0,
            value: gameOrder.pick_0.total_delivery,
          },
          {
            no: 1,
            value: gameOrder.pick_1.total_delivery,
          },
          {
            no: 2,
            value: gameOrder.pick_2.total_delivery,
          },
          {
            no: 3,
            value: gameOrder.pick_3.total_delivery,
          },
          {
            no: 4,
            value: gameOrder.pick_4.total_delivery,
          },
          {
            no: 5,
            value: gameOrder.pick_5.total_delivery,
          },
          {
            no: 6,
            value: gameOrder.pick_6.total_delivery,
          },
          {
            no: 7,
            value: gameOrder.pick_7.total_delivery,
          },
          {
            no: 8,
            value: gameOrder.pick_8.total_delivery,
          },
          {
            no: 9,
            value: gameOrder.pick_9.total_delivery,
          },
        ];
        unitArray = getSmallerAmount(getVal);
      }
    }
  }
  if (checkArray(unitArray)) {
    const randomIndex = Math.floor(Math.random() * unitArray.length);
    unit = unitArray[randomIndex];
  }
  let otp = GDM_MODULE.rn({ min: 1222, max: 1599, integer: true });
  let calPrice = setDataType(otp, "s") + setDataType(unit, "s");
  calPrice = setDataType(calPrice, "n");
  let color = arrayOfObject(colors2, { id: unit }, "colour");
  return {
    status: 1,
    unit: unit,
    price: calPrice,
    color: array_to_str(color),
  };
};
