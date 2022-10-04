const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findPolicy", async (req, res) => {
  const result = await generalCase.find(req, res, "Policy");
  return result;
});
router.get("/findAllPolicies", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Policy");
  return result;
});
router.post("/deletePolicies", async (req, res) => {
  const result = await generalCase.remove(req, res, "Policy");
  return result;
});
router.post("/updatePolicies", async (req, res) => {
  const result = await generalCase.update(req, res, "Policy");
  return result;
});
router.post("/createPolicies", async (req, res) => {
  const result = await generalCase.create(req, res, "Policy");
  return result;
});
module.exports = router;
