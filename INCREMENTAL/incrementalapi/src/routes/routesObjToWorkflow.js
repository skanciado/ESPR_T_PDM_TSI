const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findEdgeObjToWorkflow", async (req, res) => {
  const result = await generalCase.findEdge(req, res, "ObjToWorkflow");
  return result;
});
router.post("/deleteEdgeObjToWorkflow", async (req, res) => {
  const result = await generalCase.removeEdge(req, res, "ObjToWorkflow");
  return result;
});
router.post("/updateEdgeObjToWorkflow", async (req, res) => {
  const result = await generalCase.updateEdge(req, res, "ObjToWorkflow");
  return result;
});
router.post("/createEdgeObjToWorkflow", async (req, res) => {
  const result = await generalCase.createEdge(req, res, "ObjToWorkflow");
  return result;
});
module.exports = router;
