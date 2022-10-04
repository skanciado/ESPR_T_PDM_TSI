// import {useEffect} from "react";
// export const FunctionAsync = async (asyncFn, successFnc, returnFnc, dependency = undefined) => {
//   useEffect(() => {
//     let isActive = true;
//     asyncFn().then((result) => {
//       if (isActive) successFnc(result.data);
//     });
//     return () => {
//       returnFnc && returnFnc();
//       isActive = false;
//     };
//   }, [dependency]);
// };
export function orderJson(arrayToOrder, nameKey, isNumeric) {
  const result = arrayToOrder.sort(function (a, b) {
    if (isNumeric === true) {
      return a[nameKey].toString().localeCompare(b[nameKey].toString(), undefined, {numeric: true});
    } else {
      return a[nameKey].toLowerCase().localeCompare(b[nameKey].toLowerCase());
    }
  });
  return result;
}
export function orderArray(arrayToOrder, isNumeric) {
  const result = arrayToOrder.sort(function (a, b) {
    if (isNumeric === true) {
      return a.toString().localeCompare(b.toString(), undefined, {numeric: true});
    } else {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
  });
  return result;
}
export function updateValuesState(state, newValues) {
  Object.keys(newValues).forEach(function (key) {
    state[key] = newValues[key];
  });
  return state;
}
export function updateInArrValuesState(state, filter, newValues) {
  const key = Object.keys(filter)[0];
  const value = filter[key];
  const index = state.findIndex((item) => item[key] === value);
  state[index] = newValues;
  return state;
  //state.filter((item) => item[key] !== value).concat(newValues);
}
export function removeInArrValuesState(state, filter) {
  const key = Object.keys(filter)[0];
  const value = filter[key];
  return state.filter((item) => item[key] !== value);
}
