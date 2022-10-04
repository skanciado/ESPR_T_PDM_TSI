const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findStatus", async (req, res) => {
  const result = await generalCase.find(req, res, "Status");
  return result;
});
router.post("/findAllStatus", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Status");
  return result;
});
router.post("/deleteStatus", async (req, res) => {
  const result = await generalCase.remove(req, res, "Status");
  return result;
});
router.post("/updateStatus", async (req, res) => {
  const result = await generalCase.update(req, res, "Status");
  return result;
});
router.post("/createStatus", async (req, res) => {
  const result = await generalCase.create(req, res, "Status");
  return result;
});
module.exports = router;
