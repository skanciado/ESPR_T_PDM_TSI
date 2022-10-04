import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findFolders(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/findFolders", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findFolders", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findFolders", e);
  }
  return undefined;
}
export async function findAllFolders() {
  try {
    let result = undefined;
    result = await axiosAsync.get("folders/findAllFolders");
    if (result?.status !== 200) {
      errorMessage("findAllFolders", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllFolders", e);
  }
  return [];
}

export async function findAllFoldersForUser(sUserId, sGroupId, sRoleId, bIsAdmin) {
  try {
      let result = undefined;
      const sObjTypeName = "Folders";

      result = await axiosAsync.post("objectTypesCase/getObjectsForUser", {objectTypeName: sObjTypeName, userId: sUserId, groupId: sGroupId, roleId: sRoleId, userIsAdmin: bIsAdmin});
      if (result?.status !== 200) {
        errorMessage("findAllFoldersForUser", result);
      } else {
        return result.data;
      }
    } catch (e) {
      errorMessage("findAllFoldersForUser", e);
    }
    return [];
}

export async function createFolders(name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/createFolders", {data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("createFolders", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createFolders", e);
  }
  return 0;
}
export async function createFolder(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/createFolders", {data: values });
    if (result?.status !== 200) {
      errorMessage("createFolders", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createFolders", e);
  }
  return 0;
}

export async function updateFolders(_id, idf, name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/updateFolders", {filter: {_id: _id, id: idf}, data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("updateFolders", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateFolders", e);
  }
  return 0;
}

export async function updateFolder(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/updateFolders", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateFolder", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateFolder", e);
  }
  return 0;
}

export async function deleteFolders(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/deleteFolders", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteFolders", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteFolders", e);
  }
  return 0;
}


export async function deleteFolder(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("folders/deleteFolders", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteFolder", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteFolder", e);
  }
  return 0;
}
