import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function findTask(id) {
    try {
      let result = undefined;
      result = await axiosAsync.post("tasks/findTask", {filter: {_id: id}});
      if (result?.status !== 200) {
        errorMessage("findTask", result);
      } else {
        return result.data._result[0];
      }
    } catch (e) {
      errorMessage("findTask", e);
    }
    return undefined;
  }
export async function findAllTasks() {
  try {
    let result = undefined;
    result = await axiosAsync.get("tasks/findAllTasks");
    if (result?.status !== 200) {
      errorMessage("findAllTasks", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllTasks", e);
  }
  return [];
}
export async function createTask(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("tasks/createTask", {data: values});
    if (result?.status !== 200) {
      errorMessage("createTask", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createTask", e);
  }
  return 0;
}
export async function updateTask(_id,values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("tasks/updateTask", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateTask", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateTask", e);
  }
  return 0;
}
export async function deleteTask(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("tasks/deleteTask", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteTask", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteTask", e);
  }
  return 0;
}
