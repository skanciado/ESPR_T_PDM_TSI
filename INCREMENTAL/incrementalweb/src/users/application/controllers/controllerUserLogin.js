import {errorMessage, consoleError} from "../../../transversal/error/errorController";
import {crudApUserLogin} from "../crud/crudApUserLogin";
import {caseGetCache} from "../../domain/userCases/caseGetCache";
export async function BtnLogin(event) {
  try {
    consoleError("debug", "BtnLogin", "start");
    let pageStateData = undefined;
    const resData = await crudApUserLogin(event.state);
    if (resData?.errData === true) {
      errorMessage("BtnLogin", "Error data login");
      return pageStateData;
    }
    if (resData?.enableUser === false) {
      errorMessage("BtnLogin", "User disabled");
      return pageStateData;
    }
    if (resData?._id === undefined) {
      return;
    }
    event.context.userDispatch.handleUserReplace(resData);
    event.state = {user: resData._id};
    await caseGetCache(event);
    consoleError("debug", "BtnLogin", "end");
    event.navigate("/home/dashboard", {replace: true});
  } catch (e) {
    errorMessage("BtnLogin", e);
  }
}
