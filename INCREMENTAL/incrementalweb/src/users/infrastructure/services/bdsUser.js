import {errorMessage} from "../../../transversal/error/errorController";
import {axiosAsync} from "../../../utilities/infrastructure/utilsInfraestructure";
export async function loginUser(email, password) {
  try {
    let result = undefined;
    result = await axiosAsync.post("usersCase/loginUser", {email: email, password: password});
    if (result?.status !== 200) {
      errorMessage("loginUser", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("loginUser", e);
  }
  return undefined;
}
export async function updatePasswordUser(email, oldPassword, password) {
  try {
    let result = undefined;
    result = await axiosAsync.post("usersCase/updatePasswordUser", {email: email, oldPassword: oldPassword, password: password});
    if (result?.status !== 200) {
      errorMessage("updatePasswordUser", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("updatePasswordUser", e);
  }
  return undefined;
}
export async function findUser(_id, id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/findUser", {filter: {_id: _id, id: id}});
    if (result?.status !== 200) {
      errorMessage("findUser", result);
    } else {
      return result.data._result[0];
    }
  } catch (e) {
    errorMessage("findUser", e);
  }
  return undefined;
}
export async function findAllUsers() {
  try {
    let result = undefined;
    result = await axiosAsync.get("users/findAllUsers");
    if (result?.status !== 200) {
      errorMessage("findAllUsers", result);
    } else {
      return result.data._result;
    }
  } catch (e) {
    errorMessage("findAllUsers", e);
  }
  return [];
}
export async function createUsers(name, email, isAdmin, enableUser, roles, groups) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/createUsers", {data: {name: name, email: email, isAdmin: isAdmin, enableUser: enableUser, roles: roles, groups: groups}});
    if (result?.status !== 200) {
      errorMessage("createUsers", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createUsers", e);
  }
  return 0;
}

export async function createUser(values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/createUsers", {data: values});
    if (result?.status !== 200) {
      errorMessage("createUser", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("createUser", e);
  }
  return 0;
}

export async function updateUsers(_id, emailf, name, email, isAdmin, enableUser, roles, groups) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/updateUsers", {filter: {_id: _id, email: emailf}, data: {name: name, email: email, isAdmin: isAdmin, enableUser: enableUser, roles: roles, groups: groups}});
    if (result?.status !== 200) {
      errorMessage("updateUsers", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateUsers", e);
  }
  return 0;
}

export async function updateUser(_id, values) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/updateUsers", {filter: {_id: _id}, data: values});
    if (result?.status !== 200) {
      errorMessage("updateUser", result);
    } else {
      return result.data.updated;
    }
  } catch (e) {
    errorMessage("updateUser", e);
  }
  return 0;
}

export async function deleteUsers(_id, email) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/deleteUsers", {filter: {_id: _id, email: email}});
    if (result?.status !== 200) {
      errorMessage("deleteUsers", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteUsers", e);
  }
  return 0;
}

export async function deleteUser(_id) {
  try {
    let result = undefined;
    result = await axiosAsync.post("users/deleteUsers", {filter: {_id: _id}});
    if (result?.status !== 200) {
      errorMessage("deleteUser", result);
    } else {
      return result.data.deleted;
    }
  } catch (e) {
    errorMessage("deleteUser", e);
  }
  return 0;
}