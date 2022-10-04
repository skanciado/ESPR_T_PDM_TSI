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

export const BASE_OBJECT_OBJECT_TYPE = "ObjectTypes/9393997";
export const DOCUMENT_OBJECT_TYPE = "ObjectTypes/9577962";
export const FOLDER_OBJECT_TYPE = "ObjectTypes/9580518";
export const GROUP_OBJECT_TYPE = "ObjectTypes/10394370";
export const LIFECYCLE_OBJECT_TYPE = "ObjectTypes/10392510";
export const POLICY_OBJECT_TYPE = "ObjectTypes/10403958";
export const PROJECT_OBJECT_TYPE =  "ObjectTypes/9580517";
export const ROLE_OBJECT_TYPE = "ObjectTypes/10394958";
export const STATUS_OBJECT_TYPE = "ObjectTypes/10383001";
export const TASK_OBJECT_TYPE = "ObjectTypes/10407241";
export const USER_OBJECT_TYPE = "ObjectTypes/10314130";
export const WORKFLOW_OBJECT_TYPE = "ObjectTypes/9580519";

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
