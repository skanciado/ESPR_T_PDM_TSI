import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function loginUser(email, password) {
  try {
    let result = undefined;
    result = await axiosAsync.post("usersCase/loginUser", {email: email, password: password});
    if (result?.status !== 200) {
      errorMessage("loginUser", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("loginUser", e);
  }
  return undefined;
}
