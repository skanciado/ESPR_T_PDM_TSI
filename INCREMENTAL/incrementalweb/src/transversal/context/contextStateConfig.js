// ordenar alfabeticamente
import React, {useReducer} from "react";
import Context from "./context";
import * as actions from "./contextActionsGeneric";
import {ReducerCache, initialStateCache} from "../../caches/context/contextReducerCache";
import {ReducerUser, initialStateUser} from "../../users/context/contextReducerUser";
import persistenceContext from "./contextStatePersistence";
const ContextState = ({children}) => {
  let store = {};
  //cache:
  const [stateReducerCache, dispatchReducerCache] = useReducer(ReducerCache, {cache: initialStateCache.cache});
  store.cache = stateReducerCache.cache;
  store.cacheDispatch = {
    handleCacheReplace: (cache) => {
      dispatchReducerCache(actions.replace(cache));
    },
    handleCacheUpdate: (cache) => {
      dispatchReducerCache(actions.update(cache));
    },
  };
  //users:
  const [stateReducerUser, dispatchReducerUser] = useReducer(ReducerUser, {user: initialStateUser.user});
  store.user = stateReducerUser.user;
  store.userDispatch = {
    handleUserReplace: (user) => {
      dispatchReducerUser(actions.replace(user));
    },
  };
  //PERSISTING DATA TO REFRESH NAVIGATOR (nota: hasta que no se ejecuta otro tipo de navegacion no cambia el type)
  let updatedStore = persistenceContext(store);
  if (updatedStore === true) {
    stateReducerCache.cache = store.cache;
    stateReducerUser.user = store.user;
  }
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
export default ContextState;
