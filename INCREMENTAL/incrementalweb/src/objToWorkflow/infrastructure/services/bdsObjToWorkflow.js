import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findEdgeObjToWorkflow(from) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToWorkflow/findEdgeObjToWorkflow", {filter: {_from: from}});
    if (result?.status !== 200) {
      errorMessage("findEdgeObjToWorkflow", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findEdgeObjToWorkflow", e);
  }
  return undefined;
}
export async function createEdgeObjToWorkflow(_from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToWorkflow/createEdgeObjToWorkflow", {data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("createEdgeObjToWorkflow", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createEdgeObjToWorkflow", e);
  }
  return 0;
}
export async function updateEdgeObjToWorkflow(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToWorkflow/updateEdgeObjToWorkflow", {filter: {_id: _id, _from: _from, _to: _to}, data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("updateEdgeObjToWorkflow", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateEdgeObjToWorkflow", e);
  }
  return 0;
}
export async function deleteEdgeObjToWorkflow(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objToWorkflow/deleteEdgeObjToWorkflow", {filter: {_id: _id, _from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("deleteEdgeObjToWorkflow", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteEdgeObjToWorkflow", e);
  }
  return 0;
}
