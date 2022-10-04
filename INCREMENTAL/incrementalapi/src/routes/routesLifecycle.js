const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findLifecycle", async (req, res) => {
  const result = await generalCase.find(req, res, "Lifecycles");
  return result;
});
router.get("/findAllLifeCycles", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Lifecycles");
  return result;
});
router.post("/deleteLifeCycles", async (req, res) => {
  const result = await generalCase.remove(req, res, "Lifecycles");
  return result;
});
router.post("/updateLifeCycles", async (req, res) => {
  const result = await generalCase.update(req, res, "Lifecycles");
  return result;
});
router.post("/createLifeCycles", async (req, res) => {
  const result = await generalCase.create(req, res, "Lifecycles");
  return result;
});
module.exports = router;
