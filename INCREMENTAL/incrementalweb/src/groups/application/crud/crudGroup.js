import {createGroup, findAllGroups, findGroup, updateGroup, deleteGroup} from "../../infrastructure/services/bdsGroups";
export async function crudApSaveGroup(target) {
  let jsonData = undefined;
  const res = await createGroup(target.email, target.password);
  if (res !== undefined) {
    jsonData = res;
    jsonData.errData = true;
    return jsonData;
  }
}
export async function crudApDeleteGroup(target) {
  let jsonData = undefined;
  const res = await deleteGroup(target.key);
  if (res !== undefined) {
    jsonData = res;
    jsonData.errData = true;
    return jsonData;
  }
}
