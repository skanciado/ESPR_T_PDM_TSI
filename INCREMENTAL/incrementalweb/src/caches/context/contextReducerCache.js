import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateCache = {
  cache: undefined,
};
export const ReducerCache = (
  state = {
    cache: initialStateCache,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        cache: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const result = updateValuesState(state.cache, action.payload);
      return {
        ...state,
        cache: result,
      };
    default:
      return state;
  }
};
