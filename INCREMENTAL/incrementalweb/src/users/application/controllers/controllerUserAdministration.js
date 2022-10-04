import {errorMessage} from "../../../transversal/error/errorController";
import {crudApUserLogin} from "../crud/crudApUserLogin";
import {caseGetCache} from "../../domain/userCases/caseGetCache";
export async function btnUserAdministration(event) {
  try {
    let pageStateData = undefined;
    const resData = await crudApUserLogin(event.state);
    if (resData?.errData === true) {
      errorMessage("btnUserAdministration", "Error data login");
      return pageStateData;
    }
    if (resData?.enableUser === false) {
      errorMessage("btnUserAdministration", "User disabled");
      return pageStateData;
    }
    //MODIFICAR CONTEXT
    event.context.userDispatch.handleUserReplace(resData);
    event.state = {user: resData._key};
    await caseGetCache(event);
    event.navigate("/home/dashboard", {replace: true});
  } catch (e) {
    errorMessage("btnUserAdministration", e);
  }
}
