import {errorMessage} from "../../transversal/error/errorController";
import axios from "axios";
const tpdmApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const axiosAsync = {
  get: async (url) =>
    await tpdmApi
      .get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
  post: async (url, body) =>
    await tpdmApi
      .post(url, body)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
  delete: async (url) =>
    await tpdmApi
      .delete(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
};
export const axiosRequests = async (method, url, data) => {
  await axios
    .request({
      method: method,
      url: url,
      data: data,
      headers: {"content-type": "application/x-www-form-urlencoded"},
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    })
    .then(() => {
      // always executed
    });
};
export async function refreshToken() {
  try {
    let result = undefined;
    result = await axiosAsync.get("tokensStatusCase/refreshToken");
    if (result?.status !== 200) {
      errorMessage("refreshToken", result);
    } else {
      return result.data;
    }
  } catch (e) {
    errorMessage("refreshToken", e);
  }
  return undefined;
}
