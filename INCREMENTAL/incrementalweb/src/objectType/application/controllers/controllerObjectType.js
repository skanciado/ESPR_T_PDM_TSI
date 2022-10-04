import {errorMessage} from "../../../transversal/error/errorController";
import {crudApCreateObjectType, crudApParentlistObjectTypes, crudApAttributelistObjectTypes} from "../crud/crudApObjectType";
export async function BtnCreateObjectType(event) {
  try {
    const resData = await crudApCreateObjectType(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnCreateObjectType", "Error CreateObjectType");
    }
    console.log(resData);
    //event.context.userDispatch.handleUserReplace(resData);
  } catch (e) {
    errorMessage("BtnCreateObjectType", e);
  }
}
export async function BtnParentlistObjectTypes(event) {
  try {
    const resData = await crudApParentlistObjectTypes(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnParentlistObjectTypes", "Error ParentlistObjectTypes");
    }
    console.log(resData);
    //event.context.userDispatch.handleUserReplace(resData);
  } catch (e) {
    errorMessage("BtnParentlistObjectTypes", e);
  }
}
export async function BtnAttributelistObjectTypes(event) {
  try {
    const resData = await crudApAttributelistObjectTypes(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnAttributelistObjectTypes", "Error AttributelistObjectTypes");
    }
    console.log(resData);
    //event.context.userDispatch.handleUserReplace(resData);
  } catch (e) {
    errorMessage("BtnAttributelistObjectTypes", e);
  }
}
