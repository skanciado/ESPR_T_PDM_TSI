import {findCache, updateCache,createCache} from "../../../caches/infrastructure/services/bdsCaches";
export async function caseCache(user, role, group, context) {
  let resUpdate = await updateCache(user, role, group);
  let res = undefined;
  if (resUpdate === 0) {
    res = await createCache(user,role, group);
  }else {
    res = await findCache(user);    
  }
  if (res !== undefined) {
    context.cacheDispatch.handleCacheReplace(res);
  }
}
