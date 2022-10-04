const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/aqlQuery", async (req, res) => {
  const result = await generalCase.query(req, res);
  return result;
});
module.exports = router;
