import {loginUser} from "../../infrastructure/services/bdsUser";
export async function crudApUserLogin(target) {
  let jsonData = undefined;
  const res = await loginUser(target.email, target.password);
  if (res !== undefined) {
    if (res?.enableUser === true) {
      jsonData = res;
      if (res?.isAdmin !== true) {
        /*let userRoleDB = await getProjectRole( res._id, "PRE_OPEN_PROJECT" );
        if ( userRoleDB !== undefined && userRoleDB.length > 0 ){
            userRole = userRoleDB[0];   
        } */
      }
      const includeRol = res.roles.includes(target.role);
      if (includeRol === true) {
        /*const actionsUser = await getAllowedActions(target.role);
        jsonData.userActions = actionsUser; */
      } else {
        jsonData.errData = true;
      }
    } else {
      jsonData.enableUser = false;
    }
    return jsonData;
  }
}
