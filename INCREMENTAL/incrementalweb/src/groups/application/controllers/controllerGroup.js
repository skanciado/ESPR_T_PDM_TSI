import {errorMessage} from "../../../transversal/error/errorController";
import {crudApSaveGroup, crudApDeleteGroup} from "../crud/crudGroup";
export async function BtnSaveGroup(event) {
  try {
    const resData = await crudApSaveGroup(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnSaveGroup", "Error data");
      return false;
    } else {
      //event.context.userDispatch.handleUserReplace(event.state);
      return true;
    }
  } catch (e) {
    errorMessage("BtnSaveGroup", e);
  }
}
export async function BtnDeleteGroup(event) {
  try {
    const resData = await crudApDeleteGroup(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnDeleteGroup", "Error data");
      return false;
    } else {
      //event.context.userDispatch.handleUserReplace(event.state);
      return true;
    }
  } catch (e) {
    errorMessage("BtnDeleteGroup", e);
  }
}
