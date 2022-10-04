const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findObjectTypes", async (req, res) => {
  const result = await generalCase.find(req, res, "ObjectTypes");
  return result;
});
router.post("/findAllObjectTypes", async (req, res) => {
  const result = await generalCase.findAll(req, res, "ObjectTypes");
  return result;
});
router.post("/deleteObjectTypes", async (req, res) => {
  const result = await generalCase.remove(req, res, "ObjectTypes");
  return result;
});
router.post("/updateObjectTypes", async (req, res) => {
  const result = await generalCase.update(req, res, "ObjectTypes");
  return result;
});
router.post("/createObjectTypes", async (req, res) => {
  const result = await generalCase.create(req, res, "ObjectTypes");
  return result;
});
module.exports = router;
