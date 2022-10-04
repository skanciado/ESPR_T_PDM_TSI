import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState, updateInArrValuesState, removeInArrValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateFiltersTable = {
  filtersTable: {table: undefined, filters: undefined},
};
export const ReducerFiltersTable = (
  state = {
    filtersTable: initialStateFiltersTable,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATEINARRY:
      return {
        ...state,
        filtersTable: state.filtersTable.concat(action.payload),
      };
    case ACTION_TYPES.UPDATEINARRY:
      const updateInArr = updateInArrValuesState(state.filtersTable, action.payload.data, action.payload.filter);
      return {
        ...state,
        filtersTable: updateInArr,
      };
    case ACTION_TYPES.REMOVEINARRY:
      const remove = removeInArrValuesState(state.filtersTable, action.payload);
      return {
        ...state,
        filtersTable: remove,
      };
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        filtersTable: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const update = updateValuesState(state.filtersTable, action.payload);
      return {
        ...state,
        filtersTable: update,
      };
    default:
      return state;
  }
};
