// ordenar alfabeticamente
import React, {useReducer} from "react";
import Context from "./context";
import * as actions from "./contextActionsGeneric";
import {ReducerFiltersTable, initialStateFiltersTable} from "../../navBars/context/contextReducerFiltersTable";
import {ReducerTables, initialStateTables} from "../../navBars/context/contextReducerTables";
import {ReducerExtendedMode, initialStateExtendedMode} from "../../navBars/context/contextReducerExtendedMode";
import {ReducerCache, initialStateCache} from "../../caches/context/contextReducerCache";
import {ReducerUser, initialStateUser} from "../../users/context/contextReducerUser";
import {ReducerProject, initialStateProject} from "../../projects/context/contextReducerProject";
import persistenceContext from "./contextStatePersistence";
const ContextState = ({children}) => {
  let store = {};
  //filters table advancedSearch:
  const [stateReducerFiltersTable, dispatchReducerFiltersTable] = useReducer(ReducerFiltersTable, {filtersTable: initialStateFiltersTable.filtersTable});
  store.filtersTable = stateReducerFiltersTable.filtersTable;
  store.filtersTableDispatch = {
    handleFiltersTableReplace: (filtersTable) => {
      dispatchReducerFiltersTable(actions.replace(filtersTable));
    },
  };
  //navBar advancedSearch:
  const [stateReducerTable, dispatchReducerTable] = useReducer(ReducerTables, {tables: initialStateTables.tables});
  store.tables = stateReducerTable.tables;
  store.tableDispatch = {
    handlTableCreateInArr: (table) => {
      dispatchReducerTable(actions.createInArr(table));
    },
    handleTableUpdateInArr: (table) => {
      dispatchReducerTable(actions.updateInArr(table));
    },
    handleTableRemoveInArr: (table) => {
      dispatchReducerTable(actions.removeInArr(table));
    },
  };
   //extended mode for tables:
   const [stateReducerExtendedMode, dispatchReducerExtendedMode] = useReducer(ReducerExtendedMode, {extendedMode: initialStateExtendedMode.extendedMode});
   store.extendedMode = stateReducerExtendedMode.extendedMode;
   store.extendedModeDispatch = {
     handleExtendedModeReplace: (extendedMode) => {
       dispatchReducerExtendedMode(actions.replace(extendedMode));
     },
   };

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
  //project:
  const [stateReducerProject, dispatchReducerProject] = useReducer(ReducerProject, {project: initialStateProject.project});
  store.project = stateReducerProject.project;
  store.projectDispatch = {
    handleProjectReplace: (project) => {
      dispatchReducerProject(actions.replace(project));
    },
    handleProjectUpdate: (project) => {
      dispatchReducerProject(actions.update(project));
    },
    handleProjectCreateInArr: (project) => {
      dispatchReducerProject(actions.createInArr(project));
    },
    handleProjectUpdateInArr: (project) => {
      dispatchReducerProject(actions.updateInArr(project));
    },
    handleProjectRemoveInArr: (project) => {
      dispatchReducerProject(actions.removeInArr(project));
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
