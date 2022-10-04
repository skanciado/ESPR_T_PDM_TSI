import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findEdgeObjToLifecycle(from) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToLifecycle/findEdgeObjToLifecycle", {filter: {_from: from}});
    if (result?.status !== 200) {
      errorMessage("findEdgeObjToLifecycle", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findEdgeObjToLifecycle", e);
  }
  return undefined;
}
export async function createEdgeObjToLifecycle(_from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToLifecycle/createEdgeObjToLifecycle", {data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("createEdgeObjToLifecycle", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createEdgeObjToLifecycle", e);
  }
  return 0;
}
export async function updateEdgeObjToLifecycle(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToLifecycle/updateEdgeObjToLifecycle", {filter: {_id: _id, _from: _from, _to: _to}, data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("updateEdgeObjToLifecycle", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateEdgeObjToLifecycle", e);
  }
  return 0;
}
export async function deleteEdgeObjToLifecycle(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToLifecycle/deleteEdgeObjToLifecycle", {filter: {_id: _id, _from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("deleteEdgeObjToLifecycle", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteEdgeObjToLifecycle", e);
  }
  return 0;
}
