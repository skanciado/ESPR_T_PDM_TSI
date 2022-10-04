import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function updateEdgeCurrentLifecycles(_id, idf, idt, currentStatus) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentlifecycle/updateEdgeCurrentLifecycles", {filter: {_id: _id, _from: idf, _to: idt}, data: {currentStatus: currentStatus}});
    if (result?.status !== 200) {
      errorMessage("updateCurrentLifecycles", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateCurrentLifecycles", e);
  }
  return 0;
}
export async function createEdgeCurrentLifecycles(_from, _to, currentStatus) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentlifecycle/createEdgeCurrentLifecycles", {data: {_from: _from, _to: _to, currentStatus: currentStatus}});
    if (result?.status !== 200) {
      errorMessage("createEdgeCurrentLifecycles", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createEdgeCurrentLifecycles", e);
  }
  return 0;
}
export async function deleteEdgeCurrentLifecycles(_id, _from) {
  try {
    let result = undefined;
    result = await axiosAsync.post("currentlifecycle/deleteEdgeCurrentLifecycles", {filter: {_id: _id, _from: _from}});
    if (result?.status !== 200) {
      errorMessage("deleteEdgeCurrentLifecycles", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteEdgeCurrentLifecycles", e);
  }
  return 0;
}

export async function findEdgeCurrentLifecycles(from) {
    try {
      let result = undefined;
      result = await axiosAsync.post("currentlifecycle/findEdgeCurrentLifecycles", {filter: {_from: from}});
      if (result?.status !== 200) {
        errorMessage("findEdgeCurrentLifecycles", result);
      } else {
        return result.data._result[0];
      }
    } catch (e) {
      errorMessage("findEdgeCurrentLifecycles", e);
    }
    return undefined;
  }
