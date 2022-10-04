const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findObjectTypes", async (req, res) => {
  const result = await generalCase.find(req, res, "ObjectTypes");
  return result;
});
module.exports = router;
