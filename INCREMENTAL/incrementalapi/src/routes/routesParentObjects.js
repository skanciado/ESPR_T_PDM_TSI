const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findParentObjects", async (req, res) => {
  const result = await generalCase.find(req, res, "ParentObjects");
  return result;
});
module.exports = router;
