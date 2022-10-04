import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findAllPolicies() {
  try {
    let result = undefined;
    result = await axiosAsync.get("policies/findAllPolicies");
    if (result?.status !== 200) {
      errorMessage("findAllPolicies", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllPolicies", e);
  }
  return [];
}
export async function createPolicies(name, id, user, group, role, inProject, read, modify, exportt, revise, linkObjects, promote, demote) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/createPolicies", {data: {name: name, id: id, user: user, group: group, role: role, inProject: inProject, read: read, modify: modify, exportt: exportt, revise: revise, linkObjects: linkObjects, promote: promote, demote: demote}});
    if (result?.status !== 200) {
      errorMessage("createPolicies", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createPolicies", e);
  }
  return 0;
}
export async function createPolicy(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/createPolicies", {data: values});
    if (result?.status !== 200) {
      errorMessage("createPolicy", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createPolicy", e);
  }
  return 0;
}
export async function updatePolicies(_id, idf, name, id, user, group, role, inProject, read, modify, exportt, revise, linkObjects, promote, demote) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/updatePolicies", {filter: {_id: _id, id: idf}, data: {name: name, id: id, user: user, group: group, role: role, inProject: inProject, read: read, modify: modify, exportt: exportt, revise: revise, linkObjects: linkObjects, promote: promote, demote: demote}});
    if (result?.status !== 200) {
      errorMessage("updatePolicies", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updatePolicies", e);
  }
  return 0;
}
export async function updatePolicy(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/updatePolicies", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updatePolicy", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updatePolicy", e);
  }
  return 0;
}
export async function deletePolicies(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/deletePolicies", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deletePolicies", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deletePolicies", e);
  }
  return 0;
}
export async function deletePolicy(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("policies/deletePolicies", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deletePolicy", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deletePolicy", e);
  }
  return 0;
}