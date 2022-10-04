import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findProjects(_id, id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("projects/findProjects", {filter: {_id: _id, id: id}});
    if (result?.status !== 200) {
      errorMessage("findProjects", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findProjects", e);
  }
  return undefined;
}
export async function findAllProjects() {
  try {
    let result = undefined;
    result = await axiosAsync.get("projects/findAllProjects");
    if (result?.status !== 200) {
      errorMessage("findAllProjects", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllProjects", e);
  }
  return [];
}

export async function findAllProjectsForUser(sUserId, sGroupId, sRoleId, bIsAdmin) {
    try {
      let result = undefined;
      const sObjTypeName = "Projects";

      result = await axiosAsync.post("objectTypesCase/getObjectsForUser", {objectTypeName: sObjTypeName, userId: sUserId, groupId: sGroupId, roleId: sRoleId, userIsAdmin: bIsAdmin});
      if (result?.status !== 200) {
        errorMessage("findAllProjectsForUser", result);
      } else {
        return result.data;
      }
    } catch (e) {
      errorMessage("findAllProjectsForUser", e);
    }
    return [];
  }
export async function createProject(values) {
    try {
      let result = undefined;
      result = await axiosAsync.post("projects/createProjects", {data: values});
      if (result?.status !== 200) {
        errorMessage("createProjects", result);
      } else {
        return result.data;
      }
    } catch (e) {
      errorMessage("createProjects", e);
    }
    return 0;
  }
export async function createProjects(name, id, owner, owningGroup, lastModifyingUser, lastModifyingDate, creationDate, projectType, description) {
  try {
    let result = undefined;
    result = await axiosAsync.post("projects/createProjects", {data: {name: name, id: id, owner: owner, owningGroup: owningGroup, lastModifyingUser: lastModifyingUser, lastModifyingDate: lastModifyingDate, creationDate: creationDate, projectType: projectType, description: description}});
    if (result?.status !== 200) {
      errorMessage("createProjects", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createProjects", e);
  }
  return 0;
}
export async function updateProjects(_id, idf, name, id, owner, owningGroup, lastModifyingUser, lastModifyingDate, creationDate, projectType, description) {
    try {
      let result = undefined;
      result = await axiosAsync.post("projects/updateProjects", {filter: {_id: _id, id: idf}, data: {name: name, id: id, owner: owner, owningGroup: owningGroup, lastModifyingUser: lastModifyingUser, lastModifyingDate: lastModifyingDate, creationDate: creationDate, projectType: projectType, description: description}});
      if (result?.status !== 200) {
        errorMessage("updateProjects", result);
      } else {
        return result.data.updated;
      }
    } catch (e) {
      errorMessage("updateProjects", e);
    }
    return 0;
  }

export async function updateProject(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("projects/updateProjects", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateProjects", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateProjects", e);
  }
  return 0;
}
export async function deleteProjects(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("projects/deleteProjects", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteProjects", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteProjects", e);
  }
  return 0;
}

export async function deleteProject(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("projects/deleteProjects", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteProjects", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteProjects", e);
  }
  return 0;
}
