const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findDocuments", async (req, res) => {
  const result = await generalCase.find(req, res, "Documents");
  return result;
});
router.get("/findAllDocuments", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Documents");
  return result;
});
router.post("/deleteDocuments", async (req, res) => {
  const result = await generalCase.remove(req, res, "Documents");
  return result;
});
router.post("/updateDocuments", async (req, res) => {
  const result = await generalCase.update(req, res, "Documents");
  return result;
});
router.post("/createDocuments", async (req, res) => {
  const result = await generalCase.create(req, res, "Documents");
  return result;
});
module.exports = router;
