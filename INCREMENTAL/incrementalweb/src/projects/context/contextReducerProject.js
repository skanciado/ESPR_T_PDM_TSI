import * as ACTION_TYPES from "../../transversal/context/contextActionsGeneric";
import {updateValuesState, updateInArrValuesState, removeInArrValuesState} from "../../utilities/allLayers/utilsAllLayers";
export const initialStateProject = {
  user: undefined,
};
export const ReducerProject = (
  state = {
    project: initialStateProject,
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.CREATEINARRY:
      return {
        ...state,
        project: state.project.concat(action.payload),
      };
    case ACTION_TYPES.UPDATEINARRY:
      const updateInArr = updateInArrValuesState(state.project, action.payload.data, action.payload.filter);
      return {
        ...state,
        project: updateInArr,
      };
    case ACTION_TYPES.REMOVEINARRY:
      const remove = removeInArrValuesState(state.project, action.payload);
      return {
        ...state,
        project: remove,
      };
    case ACTION_TYPES.REPLACE:
      return {
        ...state,
        project: action.payload,
      };
    case ACTION_TYPES.UPDATE:
      const update = updateValuesState(state.project, action.payload);
      return {
        ...state,
        project: update,
      };
    default:
      return state;
  }
};
