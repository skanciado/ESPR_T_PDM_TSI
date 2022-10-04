import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findStatus(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("status/findStatus", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findStatus", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findStatus", e);
  }
  return undefined;
}
export async function findAllStatus() {
  try {
    let result = undefined;
    result = await axiosAsync.post("status/findAllStatus");
    if (result?.status !== 200) {
      errorMessage("findAllStatus", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllStatus", e);
  }
  return [];
}
export async function createStatus(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("status/createStatus", {data: values});
    if (result?.status !== 200) {
      errorMessage("createStatus", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createStatus", e);
  }
  return 0;
}
export async function updateStatus(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("status/updateStatus", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateStatus", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateStatus", e);
  }
  return 0;
}
export async function deleteStatus(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("status/deleteStatus", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteStatus", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteStatus", e);
  }
  return 0;
}
