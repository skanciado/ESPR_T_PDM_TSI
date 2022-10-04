import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findDocuments(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/findDocuments", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findDocuments", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findDocuments", e);
  }
  return undefined;
}
export async function findAllDocuments() {
  try {
    let result = undefined;
    result = await axiosAsync.get("documents/findAllDocuments");
    if (result?.status !== 200) {
      errorMessage("findAllDocuments", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllDocuments", e);
  }
  return [];
}
export async function createDocuments(name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/createDocuments", {data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("createDocuments", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createDocuments", e);
  }
  return 0;
}

export async function createDocument(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/createDocuments", {data: values});
    if (result?.status !== 200) {
      errorMessage("createDocument", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createDocument", e);
  }
  return 0;
}

export async function updateDocuments(_id, idf, name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/updateDocuments", {filter: {_id: _id, id: idf}, data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("updateDocuments", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateDocuments", e);
  }
  return 0;
}

export async function updateDocument(_id, data) {
    try {
      let result = undefined;
      result = await axiosAsync.post("documents/updateDocuments", {filter: {_id: _id}, data: data});
      if (result?.status !== 200) {
        errorMessage("updateDocuments", result);
      } else {
        return result.data.updated;
      }
    } catch (e) {
      errorMessage("updateDocuments", e);
    }
    return 0;
  }

export async function deleteDocuments(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/deleteDocuments", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteDocuments", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteDocuments", e);
  }
  return 0;
}

export async function deleteDocument(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("documents/deleteDocuments", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteDocument", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteDocument", e);
  }
  return 0;
}
