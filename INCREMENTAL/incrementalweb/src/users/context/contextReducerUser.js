import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState, updateInArrValuesState, removeInArrValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateUser = {
  user: undefined,
};
export const ReducerUser = (
  state = {
    user: initialStateUser,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATEINARRY:
      return {
        ...state,
        user: state.user.concat(action.payload),
      };
    case ACTION_TYPES.UPDATEINARRY:
      const updateInArr = updateInArrValuesState(state.user, action.payload.data, action.payload.filter);
      return {
        ...state,
        user: updateInArr,
      };
    case ACTION_TYPES.REMOVEINARRY:
      const remove = removeInArrValuesState(state.user, action.payload);
      return {
        ...state,
        user: remove,
      };
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const update = updateValuesState(state.user, action.payload);
      return {
        ...state,
        user: update,
      };
    default:
      return state;
  }
};
