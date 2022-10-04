import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState, updateInArrValuesState, removeInArrValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateExtendedMode = {
  extendedMode: {value: undefined},
};
export const ReducerExtendedMode = (
  state = {
    extendedMode: initialStateExtendedMode,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATEINARRY:
      return {
        ...state,
        extendedMode: state.extendedMode.concat(action.payload),
      };
    case ACTION_TYPES.UPDATEINARRY:
      const updateInArr = updateInArrValuesState(state.extendedMode, action.payload.data, action.payload.filter);
      return {
        ...state,
        extendedMode: updateInArr,
      };
    case ACTION_TYPES.REMOVEINARRY:
      const remove = removeInArrValuesState(state.extendedMode, action.payload);
      return {
        ...state,
        extendedMode: remove,
      };
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        extendedMode: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const update = updateValuesState(state.extendedMode, action.payload);
      return {
        ...state,
        extendedMode: update,
      };
    default:
      return state;
  }
};
