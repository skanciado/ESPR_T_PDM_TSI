const axios = require("axios");
const tpdmApiLog = axios.create({
  baseURL: process.env.REACT_APP_API_LOG_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
const axiosLogAsync = {
  post: async (url, body) =>
    await tpdmApiLog
      .post(url, body)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      }),
};
async function saveLogMessage(level, message, optinalParam) {
  try {
    const result = await axiosLogAsync.post(null, {level: level, message: message, optinalParam: optinalParam});
  } catch (e) {
    console.log(e);
  }
}
module.exports.saveLogMessage = saveLogMessage;
