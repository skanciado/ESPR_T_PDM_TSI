import {updateCache} from "../../../caches/infrastructure/services/bdsCaches";
export async function crudDoUpdateCache(user, role) {
  const res = await updateCache(user, role);
  return res;
}
