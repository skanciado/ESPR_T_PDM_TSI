const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findEdgeObjToLifecycle", async (req, res) => {
  const result = await generalCase.findEdge(req, res, "ObjToLifecycle");
  return result;
});
router.post("/deleteEdgeObjToLifecycle", async (req, res) => {
  const result = await generalCase.removeEdge(req, res, "ObjToLifecycle");
  return result;
});
router.post("/updateEdgeObjToLifecycle", async (req, res) => {
  const result = await generalCase.updateEdge(req, res, "ObjToLifecycle");
  return result;
});
router.post("/createEdgeObjToLifecycle", async (req, res) => {
  const result = await generalCase.createEdge(req, res, "ObjToLifecycle");
  return result;
});
module.exports = router;
