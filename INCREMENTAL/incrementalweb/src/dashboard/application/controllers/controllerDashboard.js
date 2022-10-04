import {errorMessage} from "../../../transversal/error/errorController";
export async function BtnTest(event) {
  try {
    console.log(event.context.user);
  } catch (e) {
    errorMessage("BtnTest", e);
  }
}
