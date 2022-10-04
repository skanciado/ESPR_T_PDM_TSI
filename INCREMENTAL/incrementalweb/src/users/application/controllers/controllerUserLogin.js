import {errorMessage, consoleError} from "../../../transversal/error/errorController";
import {crudApUserLogin} from "../crud/crudApUserLogin";
import {caseCache} from "../../../caches/domain/hooksCode/hooksCodeDoCache";
export async function btnLogin(event) {
  try {
    consoleError("debug", "btnLogin", "start");
    let pageStateData = undefined;
    const resData = await crudApUserLogin(event.state);
    if (resData?.errData === true) {
      errorMessage("btnLogin", "Error data login");
      return pageStateData;
    }
    if (resData?.enableUser === false) {
      errorMessage("btnLogin", "User disabled");
      return pageStateData;
    }
    if (resData?._id === undefined) {
      return;
    }
    event.context.userDispatch.handleUserReplace(resData);
    event.state.user = resData._id;
    await caseCache(event.state.user, event.state.role, event.state.group, event.context);
    consoleError("debug", "btnLogin", "end");
    event.navigate("/home/dashboard", {replace: true});
  } catch (e) {
    errorMessage("btnLogin", e);
  }
}
