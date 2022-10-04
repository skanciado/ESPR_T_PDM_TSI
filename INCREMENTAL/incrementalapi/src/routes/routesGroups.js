const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/createGroup", async (req, res) => {
  const result = await generalCase.create(req, res, "Groups");
  return result;
});
router.get("/findAllGroups", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Groups");
  return result;
});
router.post("/findGroup", async (req, res) => {
  const result = await generalCase.find(req, res, "Groups");
  return result;
});
router.post("/deleteGroup", async (req, res) => {
  const result = await generalCase.remove(req, res, "Groups");
  return result;
});
router.post("/updateGroup", async (req, res) => {
  const result = await generalCase.update(req, res, "Groups");
  return result;
});
router.post("/createGroup", async (req, res) => {
  const result = await generalCase.create(req, res, "Groups");
  return result;
});
module.exports = router;
