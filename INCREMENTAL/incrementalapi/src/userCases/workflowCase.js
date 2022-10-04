const router = require("express").Router();
const {createError, createErrorWithCode} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
const objTypeQueries = require("../services/objectTypesQueries");
const workflowQueries = require("../services/workflowsQueries");
const {saveLogMessage} = require("../services/log");


router.post("/getWorkflowTaskList", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    const workflowId = req.body._id;
    console.log("workflowId: " + workflowId)
    data = await workflowQueries.getTaskList(workflowId);
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