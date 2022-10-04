const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findProjects", async (req, res) => {
  const result = await generalCase.find(req, res, "Projects");
  return result;
});
router.get("/findAllProjects", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Projects");
  return result;
});
router.post("/deleteProjects", async (req, res) => {
  const result = await generalCase.remove(req, res, "Projects");
  return result;
});
router.post("/updateProjects", async (req, res) => {
  const result = await generalCase.update(req, res, "Projects");
  return result;
});
router.post("/createProjects", async (req, res) => {
  const result = await generalCase.create(req, res, "Projects");
  return result;
});
module.exports = router;
