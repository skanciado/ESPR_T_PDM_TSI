import {crudDoUpdateCache} from "../crud/crudDoUpdateCache";
export async function caseUpdateCache(event) {
  const res = await crudDoUpdateCache(event.context.cache.user, event.role);
  if (res !== 0) {
    event.context.cacheDispatch.handleCacheUpdate({roleLast: event.role});
  }
}
