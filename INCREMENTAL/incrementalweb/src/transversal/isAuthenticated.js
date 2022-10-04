import {refreshToken} from "../utilities/infrastructure/utilsInfraestructure";
export const isAuthenticated = async () => {
  const res = await refreshToken();
  if (res === undefined) {
    return false;
  } else {
    return res;
  }
};
