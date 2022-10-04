import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findObjectTypes(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypes/findObjectTypes", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findObjectTypes", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findObjectTypes", e);
  }
  return undefined;
}
export async function createObjectType(parent, name, attributes) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypesCase/createObjectTypes", {name: name, parent: parent, data: {...attributes}});
    if (result?.status !== 200) {
      errorMessage("createObjectTypes", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createObjectTypes", e);
  }
  return 0;
}
export async function parentlistObjectTypes(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypesCase/parentlistObjectTypes", {_id: id});
    if (result?.status !== 200) {
      errorMessage("parentlistObjectTypes", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("parentlistObjectTypes", e);
  }
  return [];
}
export async function attributelistObjectTypes(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypesCase/attributelistObjectTypes", {_id: id});
    if (result?.status !== 200) {
      errorMessage("attributelistObjectTypes", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("attributelistObjectTypes", e);
  }
  return [];
}
export async function getValueRelation(relationType, tableName, relationKey, filterValue, filterKey) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypesCase/getValueRelation", {relationType: relationType, tableName: tableName, relationKey: relationKey, filterKey: filterKey, filterValue: filterValue});
    if (result?.status !== 200) {
      errorMessage("getValueRelation", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("getValueRelation", e);
  }
  return "";
}
export async function getSelectOneRelation(relationType, relationName, relationKey, relationValue) {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypesCase/getSelectOneRelation", {relationType: relationType, relationName: relationName, relationKey: relationKey, relationValue: relationValue});
    if (result?.status !== 200) {
      errorMessage("getSelectOneRelation", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("getSelectOneRelation", e);
  }
  return undefined;
}
export async function findAllObjectTypes() {
  try {
    let result = undefined;
    result = await axiosAsync.post("objectTypes/findAllObjectTypes");
    if (result?.status !== 200) {
      errorMessage("findAllObjectTypes", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllObjectTypes", e);
  }
  return undefined;
}
