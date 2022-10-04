//CREATE se usaria para añadir datos a una array.
export const CREATEINARRY = "CREATENARRY";
export const UPDATEINARRY = "UPDATEINARRY";
export const REMOVEINARRY = "REMOVEINARRY";
export const UPDATE = "UPDATE";
export const REPLACE = "REPLACE";
export const createInArr = (data) => {
  return {
    type: CREATEINARRY,
    payload: data,
  };
};
export const updateInArr = (data) => {
  return {
    type: UPDATEINARRY,
    payload: data,
  };
};
export const removeInArr = (data) => {
  return {
    type: REMOVEINARRY,
    payload: data,
  };
};
export const update = (data) => {
  return {
    type: UPDATE,
    payload: data,
  };
};
export const replace = (data) => {
  return {
    type: REPLACE,
    payload: data,
  };
};
