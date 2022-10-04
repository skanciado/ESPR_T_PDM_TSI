const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findFolders", async (req, res) => {
  const result = await generalCase.find(req, res, "Folders");
  return result;
});
router.get("/findAllFolders", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Folders");
  return result;
});
router.post("/deleteFolders", async (req, res) => {
  const result = await generalCase.remove(req, res, "Folders");
  return result;
});
router.post("/updateFolders", async (req, res) => {
  const result = await generalCase.update(req, res, "Folders");
  return result;
});
router.post("/createFolders", async (req, res) => {
  const result = await generalCase.create(req, res, "Folders");
  return result;
});
module.exports = router;
