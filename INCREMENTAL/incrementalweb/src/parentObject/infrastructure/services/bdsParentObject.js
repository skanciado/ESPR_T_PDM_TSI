import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findParentObjects(from, to) {
  try {
    let result = undefined;
    result = await axiosAsync.post("parentObjects/findParentObjects", {filter: {_from: from, _to: to}});
    if (result?.status !== 200) {
      errorMessage("findParentObjects", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findParentObjects", e);
  }
  return undefined;
}
