import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findWorkflows(id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/findWorkflows", {filter: {_id: id}});
    if (result?.status !== 200) {
      errorMessage("findWorkflows", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findWorkflows", e);
  }
  return undefined;
}
export async function findAllWorkflows() {
  try {
    let result = undefined;
    result = await axiosAsync.get("workflows/findAllWorkflows");
    if (result?.status !== 200) {
      errorMessage("findAllWorkflows", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllWorkflows", e);
  }
  return [];
}
export async function createWorkflows(name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/createWorkflows", {data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("createWorkflows", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createWorkflows", e);
  }
  return 0;
}
export async function createWorkflow(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/createWorkflows", {data: values});
    if (result?.status !== 200) {
      errorMessage("createWorkflow", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createWorkflow", e);
  }
  return 0;
}

export async function updateWorkflows(_id, idf, name, id, owner, creationDate) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/updateWorkflows", {filter: {_id: _id, id: idf}, data: {name: name, id: id, owner: owner, creationDate: creationDate}});
    if (result?.status !== 200) {
      errorMessage("updateWorkflows", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateWorkflows", e);
  }
  return 0;
}
export async function updateWorkflow(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/updateWorkflows", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateWorkflows", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateWorkflows", e);
  }
  return 0;
}
export async function deleteWorkflows(_id, idf) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/deleteWorkflows", {filter: {_id: _id, id: idf}});
    if (result?.status !== 200) {
      errorMessage("deleteWorkflows", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteWorkflows", e);
  }
  return 0;
}

export async function deleteWorkflow(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("workflows/deleteWorkflows", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteWorkflow", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteWorkflow", e);
  }
  return 0;
}

export async function getWorkflowTaskList(_id, idf) {
    try {
      let result = undefined;
      result = await axiosAsync.post("workflowsCase/getWorkflowTaskList", {_id: _id});
      if (result?.status !== 200) {
        errorMessage("getWorkflowTaskList", result);
      } else {
        return result.data;
      }
    } catch (e) {
      errorMessage("getWorkflowTaskList", e);
    }
    return 0;
  }