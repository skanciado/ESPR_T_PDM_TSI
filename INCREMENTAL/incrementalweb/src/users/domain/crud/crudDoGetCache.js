import {findCache} from "../../../caches/infrastructure/services/bdsCaches";
export async function crudDoGetCache(target) {
  const res = await findCache(target.user);
  return res;
}