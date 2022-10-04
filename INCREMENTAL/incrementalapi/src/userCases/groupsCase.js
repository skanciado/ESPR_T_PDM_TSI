const router = require("express").Router();
const {createError} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
const generalQueries = require("../services/generalQueriesArangoDb");
const {saveLogMessage} = require("../services/log");
router.get("/findAllGroupsCase", async (req, res) => {
  try {
    const result = await generalQueries.findAll("Groups");
    return res.send(result);
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/findGroupsCase", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      const revisions = await generalQueries.query(`
              FOR e IN Groups
              FILTER e._id IN ['${req.body.ids}']
              RETURN e
          `);
      return res.send(revisions);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
module.exports = router;
