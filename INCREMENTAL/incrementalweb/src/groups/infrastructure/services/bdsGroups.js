import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function createGroup(name, users) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/createGroup", {data: {name: name, users: users}});
    if (result?.status !== 200) {
      errorMessage("createGroup", result);
    } else {
      return result.data.created;
    }
  } catch (e) {
    errorMessage("createGroup", e);
  }
  return 0;
}
export async function findAllGroups() {
  try {
    let result = undefined;
    result = await axiosAsync.get("groups/findAllGroups");
    if (result?.status !== 200) {
      errorMessage("findAllGroups", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findAllGroups", e);
  }
  return [];
}
export async function findGroup(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/findGroup", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findGroup", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findGroup", e);
  }
  return undefined;
}
export async function updateGroup(id, name, users) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/updateCache", {filter: {_id: id}, data: {name: name, users: users}});
    if (result?.status !== 200) {
      errorMessage("updateCache", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateCache", e);
  }
  return 0;
}
export async function deleteGroup(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/deleteGroup", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("deleteGroup", result);
    } else {
      return result.data.removed;
    }
  } catch (e) {
    errorMessage("deleteGroup", e);
  }
  return 0;
}
