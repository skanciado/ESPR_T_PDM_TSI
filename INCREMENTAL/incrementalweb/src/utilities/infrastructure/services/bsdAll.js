import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function createGeneralEdge(where, from, to, attributes) {
    try {
        let result = undefined;
        attributes["_from"]= from;
        attributes["_to"]= to;
        result = await axiosAsync.post("generalCase/createGeneralEdge", {where: where, data: attributes});
        if (result?.status !== 200) {
          errorMessage("createGeneralEdge", result);
        } else {
          return result.data;
        }
      } catch (e) {
        errorMessage("createGeneralEdge", e);
      }
      return 0;
}

export async function findGeneralEdge(relSearchTo, idObjFrom, idObjTo){
    try {
        let result = undefined;
        let searchFilter ={};
        if( idObjFrom !== undefined ){
            searchFilter['_from'] = idObjFrom;
        }
        if( idObjTo !== undefined ){
            searchFilter['_to'] = idObjTo;
        }
        result = await axiosAsync.post("generalCase/findGeneralEdge", {where: relSearchTo, filter: searchFilter});
        if (result?.status !== 200) {
          errorMessage("findGeneralEdge", result);
        } else {
          return result.data._result[0];
        }
      } catch (e) {
        errorMessage("findGeneralEdge", e);
      }
      return 0;
}

export async function findAllGeneralEdge(relSearchTo, idObjFrom, idObjTo){
    try {
        let result = undefined;
        let searchFilter ={};
        if( idObjFrom !== undefined ){
            searchFilter['_from'] = idObjFrom;
        }
        if( idObjTo !== undefined ){
            searchFilter['_to'] = idObjTo;
        }
        result = await axiosAsync.post("generalCase/findGeneralEdge", {where: relSearchTo, filter: searchFilter});
        if (result?.status !== 200) {
          errorMessage("findGeneralEdge", result);
        } else {
          return result.data._result;
        }
      } catch (e) {
        errorMessage("findGeneralEdge", e);
      }
      return 0;
}

export async function deleteAllGeneralEdge(relSearchTo, idObjFrom, idObjTo){
    try {
        let result = undefined;
        let searchFilter ={};
        if( idObjFrom !== undefined ){
            searchFilter['_from'] = idObjFrom;
        }
        if( idObjTo !== undefined ){
            searchFilter['_to'] = idObjTo;
        }
        result = await axiosAsync.post("generalCase/deleteGeneralEdge", {where: relSearchTo, filter: searchFilter});
        if (result?.status !== 200) {
          errorMessage("deleteAllGeneralEdge", result);
        } else {
          return result.data.deleted;
        }
      } catch (e) {
        errorMessage("deleteAllGeneralEdge", e);
      }
      return 0;
}

export async function updateGeneralEdge( where, idDB, attributes) {
  try {
    let result = undefined;
    result = await axiosAsync.post("generalCase/updateGeneralEdge", {where: where, filter: {_id: idDB}, data: attributes});
    if (result?.status !== 200) {
      errorMessage("updateCurrentLifecycles", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateCurrentLifecycles", e);
  }
  return 0;
}


export async function findGeneralObject( where, idDB) {
    try {
      let result = undefined;
      result = await axiosAsync.post("generalCase/findGeneralObject", {where: where, filter: {_id: idDB}});
      if (result?.status !== 200) {
        errorMessage("findGeneralObject", result);
      } else {
        return result.data._result[0];
      }
    } catch (e) {
      errorMessage("findGeneralObject", e);
    }
    return 0;
  }

export async function deleteGeneralObject( where, idDB) {
    try {
      let result = undefined;
      result = await axiosAsync.post("generalCase/deleteGeneralObject", {where: where, filter: {_id: idDB}});
      if (result?.status !== 200) {
        errorMessage("deleteGeneralObject", result);
      } else {
        return result.data.deleted;
      }
    } catch (e) {
      errorMessage("deleteGeneralObject", e);
    }
    return 0;
  }