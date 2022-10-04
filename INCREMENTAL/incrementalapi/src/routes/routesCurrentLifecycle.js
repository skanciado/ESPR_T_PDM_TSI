const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/updateEdgeCurrentLifecycles", async (req, res) => {
  const result = await generalCase.updateEdge(req, res, "CurrentLifecycle");
  return result;
});
router.post("/createEdgeCurrentLifecycles", async (req, res) => {
  const result = await generalCase.createEdge(req, res, "CurrentLifecycle");
  return result;
});
router.post("/deleteEdgeCurrentLifecycles", async (req, res) => {
  const result = await generalCase.removeEdge(req, res, "CurrentLifecycle");
  return result;
});
router.post("/findEdgeCurrentLifecycles", async (req, res) => {
    const result = await generalCase.findEdge(req, res, "CurrentLifecycle");
    return result;
  });
module.exports = router;
