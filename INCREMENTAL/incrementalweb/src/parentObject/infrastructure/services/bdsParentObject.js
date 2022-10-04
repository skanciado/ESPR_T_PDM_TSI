import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findEdgeParentObjects(from, to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("parentObjects/findEdgeParentObjects", {filter: {_from: from, _to: to}});
    if (result?.status !== 200) {
      errorMessage("findEdgeParentObjects", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findEdgeParentObjects", e);
  }
  return undefined;
}
export async function createEdgeParentObjects(_from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("parentObjects/createEdgeParentObjects", {data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("createEdgeParentObjects", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createEdgeParentObjects", e);
  }
  return 0;
}
export async function updateEdgeParentObjects(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("parentObjects/updateEdgeParentObjects", {filter: {_id: _id, _from: _from, _to: _to}, data: {_from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("updateEdgeParentObjects", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateEdgeParentObjects", e);
  }
  return 0;
}
export async function deleteEdgeParentObjects(_id, _from, _to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("parentObjects/deleteEdgeParentObjects", {filter: {_id: _id, _from: _from, _to: _to}});
    if (result?.status !== 200) {
      errorMessage("deleteEdgeParentObjects", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteEdgeParentObjects", e);
  }
  return 0;
}
