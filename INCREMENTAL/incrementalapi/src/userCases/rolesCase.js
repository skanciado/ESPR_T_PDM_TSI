const router = require("express").Router();
const { createError } = require("../utils/error");
const { verifyToken } = require("../utils/tokensAndCookies");
const generalQueries = require("../services/generalQueriesArangoDb");
const { saveLogMessage } = require("../services/log");
router.get("/findAllRolesCase", async (req, res) => {
  try {
    console.info("findAllRolesCase Query");
    const result = await generalQueries.findAll("Roles");
    console.info("findAllRolesCase Done");
    return res.send(result);
  } catch (e) {
    console.error("e");
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/findRolesCase", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      const revisions = await generalQueries.query(`
              FOR e IN Roles
              FILTER e._id IN ['${req.body.ids}']
              RETURN e
          `);
      return res.send(revisions);
    } else {
      return res
        .status(process.env.CODE_API)
        .json(createErrorWithCode(900, decrypt));
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
