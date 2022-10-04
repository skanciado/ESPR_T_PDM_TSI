const router = require("express").Router();
const {createError, createErrorWithCode} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
const objTypeQueries = require("../services/objectTypesQueries");
const lifeCycleQueries = require("../services/lifeCyclesQueries");
const {saveLogMessage} = require("../services/log");


router.post("/getLifecycleStatusList", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    const lifeCycleId = req.body._id;
        data = await lifeCycleQueries.getStatusList(lifeCycleId);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
module.exports = router;