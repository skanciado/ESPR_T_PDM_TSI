import {errorMessage} from "../../../transversal/error/errorController";
import {caseUpdateCache} from "../../domain/userCases/caseUpdateCache";
export async function CbRole(event) {
  try {
    caseUpdateCache(event);
  } catch (e) {
    errorMessage("CbRole", e);
  }
}
export async function BtnAdministration(event) {
  event.navigate("/home/administration", {replace: true});
}
