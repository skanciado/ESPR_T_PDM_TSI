import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function updateEdgeCurrentWorkflows(_id, idf, idt, currentStatus) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentWorkflow/updateEdgeCurrentWorkflows", {filter: {_id: _id, _from: idf, _to: idt}, data: {currentStatus: currentStatus}});
    if (result?.status !== 200) {
      errorMessage("updateCurrentWorkflows", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateCurrentWorkflows", e);
  }
  return 0;
}
export async function createEdgeCurrentWorkflows(_from, _to, currentStatus) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentWorkflow/createEdgeCurrentWorkflows", {data: {_from: _from, _to: _to, currentStatus: currentStatus}});
    if (result?.status !== 200) {
      errorMessage("createEdgeCurrentWorkflows", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createEdgeCurrentWorkflows", e);
  }
  return 0;
}
export async function deleteEdgeCurrentWorkflows(_id, _from) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentWorkflow/deleteEdgeCurrentWorkflows", {filter: {_id: _id, _from: _from}});
    if (result?.status !== 200) {
      errorMessage("deleteEdgeCurrentWorkflows", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteEdgeCurrentWorkflows", e);
  }
  return 0;
}

export async function findEdgeCurrentWorkflows(from) {
    try {
      let result = undefined;
      result = await axiosAsync.post("currentWorkflow/findEdgeCurrentWorkflows", {filter: {_from: from}});
      if (result?.status !== 200) {
        errorMessage("findEdgeCurrentWorkflows", result);
      } else {
        return result.data._result[0];
      }
    } catch (e) {
      errorMessage("findEdgeCurrentWorkflows", e);
    }
    return undefined;
  }
