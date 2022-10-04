import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findAllGroupsCase() {
  try {
    let result = undefined;
    result = await axiosAsync.get("groupsCase/findAllGroupsCase");
    if (result?.status !== 200) {
      errorMessage("findAllGroupsCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllGroupsCase", e);
  }
  return [];
}
export async function findGroupsCase(ids) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groupsCase/findGroupsCase", {ids: ids});
    if (result?.status !== 200) {
      errorMessage("findGroupsCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findGroupsCase", e);
  }
  return [];
}
export async function findAllGroups() {
  try {
    let result = undefined;
    result = await axiosAsync.get("groups/findAllGroups");
    if (result?.status !== 200) {
      errorMessage("findAllGroups", result);
    } else {
      return result.data._result;
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
export async function createGroup(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/createGroup", {data: values});
    if (result?.status !== 200) {
      errorMessage("createGroup", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createGroup", e);
  }
  return 0;
}
export async function updateGroup(dbId, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/updateGroup", {filter: {_id: dbId}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateGroup", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateGroup", e);
  }
  return 0;
}
export async function deleteGroup(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("groups/deleteGroup", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteGroup", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteGroup", e);
  }
  return 0;
}
