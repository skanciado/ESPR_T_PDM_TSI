import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findAllLifeCycles() {
  try {
    let result = undefined;
    result = await axiosAsync.get("lifecycles/findAllLifeCycles");
    if (result?.status !== 200) {
      errorMessage("findAllLifeCycles", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllLifeCycles", e);
  }
  return [];
}
export async function findLifeCycleCase(idObjectType, relation) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifeCycleCase/findLifeCycleCase", {filter: {relation: relation, idObjectType: idObjectType}});
    if (result?.status !== 200) {
      errorMessage("findLifeCycleCase", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findLifeCycleCase", e);
  }
  return undefined;
}
export async function findLifecycle(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/findLifecycle", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findLifecycle", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findLifecycle", e);
  }
  return undefined;
}
export async function createLifeCycles(id, name, initialState) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/createLifeCycles", {data: {id: id, name: name, initialState: initialState}});
    if (result?.status !== 200) {
      errorMessage("createLifeCycles", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createLifeCycles", e);
  }
  return 0;
}
export async function createLifeCycle(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/createLifeCycles", {data: values});
    if (result?.status !== 200) {
      errorMessage("createLifeCycle", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createLifeCycle", e);
  }
  return 0;
}
export async function updateLifeCycles(_id, idf, id, name, initialState) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/updateLifeCycles", {filter: {_id: _id, id: idf}, data: {id: id, name: name, initialState: initialState}});
    if (result?.status !== 200) {
      errorMessage("updateLifeCycles", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateLifeCycles", e);
  }
  return 0;
}
export async function updateLifeCycle(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/updateLifeCycles", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateLifeCycle", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateLifeCycle", e);
  }
  return 0;
}
export async function deleteLifeCycles(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/deleteLifeCycles", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteLifeCycles", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteLifeCycles", e);
  }
  return 0;
}

export async function deleteLifeCycle(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecycles/deleteLifeCycles", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteLifeCycle", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteLifeCycle", e);
  }
  return 0;
}

export async function getLifecycleStatusList(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("lifecyclesCase/getLifecycleStatusList", {_id: _id});
    if (result?.status !== 200) {
      errorMessage("getLifecycleStatusList", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("getLifecycleStatusList", e);
  }
  return 0;
}