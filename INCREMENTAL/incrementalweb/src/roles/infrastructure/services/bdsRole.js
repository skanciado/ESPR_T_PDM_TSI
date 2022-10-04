import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findAllRolesCase() {
  try {
    let result = undefined;
    result = await axiosAsync.get("rolesCase/findAllRolesCase");
    if (result?.status !== 200) {
      errorMessage("findAllRolesCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllRolesCase", e);
  }
  return [];
}
export async function findRolesCase(ids) {
  try {
    let result = undefined;
    result = await axiosAsync.post("rolesCase/findRolesCase", {ids: ids});
    if (result?.status !== 200) {
      errorMessage("findRolesCase", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findRolesCase", e);
  }
  return [];
}
