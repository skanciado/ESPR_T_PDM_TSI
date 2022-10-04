import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findCache(user) {
  try {
    let result = undefined;
    result = await axiosAsync.post("caches/findCache", {filter: {user: user}});
    if (result?.status !== 200) {
      errorMessage("findCache", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findCache", e);
  }
  return undefined;
}
export async function updateCache(user, roleLast) {
  try {
    let result = undefined;
    result = await axiosAsync.post("caches/updateCache", {filter: {user: user}, data: {roleLast: roleLast}});
    if (result?.status !== 200) {
      errorMessage("updateCache", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateCache", e);
  }
  return 0;
}
