import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findAllRolesCase() {
  try {
    let result = undefined;
    result = await axiosAsync.get("rolesCase/findAllRolesCase");
    if (result?.status !== 200) {
      errorMessage("findAllRolesCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllRolesCase", e);
  }
  return [];
}
export async function findRolesCase(ids) {
  try {
    let result = undefined;
    result = await axiosAsync.post("rolesCase/findRolesCase", {ids: ids});
    if (result?.status !== 200) {
      errorMessage("findRolesCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findRolesCase", e);
  }
  return [];
}
export async function findAllRoles() {
  try {
    let result = undefined;
    result = await axiosAsync.get("roles/findAllRoles");
    if (result?.status !== 200) {
      errorMessage("findAllRoles", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllRoles", e);
  }
  return [];
}
export async function createRoles(id, name) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/createRoles", {data: {id: id, name: name}});
    if (result?.status !== 200) {
      errorMessage("createRoles", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createRoles", e);
  }
  return 0;
}
export async function createRole( values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/createRoles", {data: values});
    if (result?.status !== 200) {
      errorMessage("createRole", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createRole", e);
  }
  return 0;
}
export async function updateRoles(_id, idf, id, name) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/updateRoles", {filter: {_id: _id, id: idf}, data: {id: id, name: name}});
    if (result?.status !== 200) {
      errorMessage("updateRoles", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateRoles", e);
  }
  return 0;
}
export async function updateRole(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/updateRoles", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateRole", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateRole", e);
  }
  return 0;
}
export async function deleteRoles(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/deleteRoles", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteRoles", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteRoles", e);
  }
  return 0;
}

export async function deleteRole(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("roles/deleteRoles", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteRole", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteRole", e);
  }
  return 0;
}