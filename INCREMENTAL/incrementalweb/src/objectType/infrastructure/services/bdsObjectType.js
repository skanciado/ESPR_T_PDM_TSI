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
  return undefined;
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
