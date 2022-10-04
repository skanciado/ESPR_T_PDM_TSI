import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState, updateInArrValuesState, removeInArrValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateTables = {
  tables: [],
};
export const ReducerTables = (
  state = {
    tables: initialStateTables,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATEINARRY:
      return {
        ...state,
        tables: state.tables.concat(action.payload),
      };
    case ACTION_TYPES.UPDATEINARRY:
      const updateInArr = updateInArrValuesState(state.tables, action.payload.data, action.payload.filter);
      return {
        ...state,
        tables: updateInArr,
      };
    case ACTION_TYPES.REMOVEINARRY:
      const remove = removeInArrValuesState(state.tables, action.payload);
      return {
        ...state,
        tables: remove,
      };
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        tables: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const update = updateValuesState(state.tables, action.payload);
      return {
        ...state,
        tables: update,
      };
    default:
      return state;
  }
};
