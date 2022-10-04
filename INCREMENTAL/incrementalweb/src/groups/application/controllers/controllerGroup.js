import {errorMessage} from "../../../transversal/error/errorController";
import {crudApSaveGroup, crudApDeleteGroup} from "../crud/crudGroup";
export async function BtnSaveGroup(event) {
  try {
    let pageStateData = undefined;
    const resData = await crudApSaveGroup(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnSaveGroup", "Error data");
      return pageStateData;
    }
    //event.context.userDispatch.handleUserReplace(resData);
  } catch (e) {
    errorMessage("BtnSaveGroup", e);
  }
}
export async function BtnDeleteGroup(event) {
  try {
    let pageStateData = undefined;
    const resData = await crudApDeleteGroup(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnDeleteGroup", "Error data");
      return pageStateData;
    }
    //event.context.userDispatch.handleUserReplace(resData);
  } catch (e) {
    errorMessage("BtnDeleteGroup", e);
  }
}
