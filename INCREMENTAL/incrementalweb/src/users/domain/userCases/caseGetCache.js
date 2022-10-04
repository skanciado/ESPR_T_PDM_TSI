import {crudDoGetCache} from "../crud/crudDoGetCache";
export async function caseGetCache(event) {
  const res = await crudDoGetCache(event.state);
  if (res !== undefined) {
    event.context.cacheDispatch.handleCacheReplace(res);
  }
}
