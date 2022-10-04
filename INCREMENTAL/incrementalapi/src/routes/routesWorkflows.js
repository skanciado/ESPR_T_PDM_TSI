const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findWorkflows", async (req, res) => {
  const result = await generalCase.find(req, res, "Workflows");
  return result;
});
router.get("/findAllWorkflows", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Workflows");
  return result;
});
router.post("/deleteWorkflows", async (req, res) => {
  const result = await generalCase.remove(req, res, "Workflows");
  return result;
});
router.post("/updateWorkflows", async (req, res) => {
  const result = await generalCase.update(req, res, "Workflows");
  return result;
});
router.post("/createWorkflows", async (req, res) => {
  const result = await generalCase.create(req, res, "Workflows");
  return result;
});
module.exports = router;
