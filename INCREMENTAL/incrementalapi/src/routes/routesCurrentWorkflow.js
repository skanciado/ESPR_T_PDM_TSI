const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/updateEdgeCurrentWorkflows", async (req, res) => {
  const result = await generalCase.updateEdge(req, res, "CurrentWorkflow");
  return result;
});
router.post("/createEdgeCurrentWorkflows", async (req, res) => {
  const result = await generalCase.createEdge(req, res, "CurrentWorkflow");
  return result;
});
router.post("/deleteEdgeCurrentWorkflows", async (req, res) => {
  const result = await generalCase.removeEdge(req, res, "CurrentWorkflow");
  return result;
});
router.post("/findEdgeCurrentWorkflows", async (req, res) => {
    const result = await generalCase.findEdge(req, res, "CurrentWorkflow");
    return result;
  });
module.exports = router;
