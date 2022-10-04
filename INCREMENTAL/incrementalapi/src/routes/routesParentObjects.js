const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findEdgeParentObjects", async (req, res) => {
  const result = await generalCase.findEdge(req, res, "ParentObjects");
  return result;
});
router.post("/deleteEdgeParentObjects", async (req, res) => {
  const result = await generalCase.removeEdge(req, res, "ParentObjects");
  return result;
});
router.post("/updateEdgeParentObjects", async (req, res) => {
  const result = await generalCase.updateEdge(req, res, "ParentObjects");
  return result;
});
router.post("/createEdgeParentObjects", async (req, res) => {
  const result = await generalCase.createEdge(req, res, "ParentObjects");
  return result;
});
module.exports = router;
