const router = require("express").Router();
const generalCase = require("./generalCase");
router.get("/findAllRoles", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Roles");
  return result;
});
router.post("/deleteRoles", async (req, res) => {
  const result = await generalCase.remove(req, res, "Roles");
  return result;
});
router.post("/updateRoles", async (req, res) => {
  const result = await generalCase.update(req, res, "Roles");
  return result;
});
router.post("/createRoles", async (req, res) => {
  const result = await generalCase.create(req, res, "Roles");
  return result;
});
/* router.post("/updateRoles", async (req, res) => {
  const result = await generalCase.updateJson(req, res, "Roles");
  return result;
});
router.post("/deleteJsonRoles", async (req, res) => {
  const result = await generalCase.deleteJson(req, res, "Roles");
  return result;
});
router.post("/findJsonRoles", async (req, res) => {
  const result = await generalCase.findJson(req, res, "Roles");
  return result;
});
router.post("/createJsonRoles", async (req, res) => {
  const result = await generalCase.createJson(req, res, "Roles");
  return result;
});
router.post("/findRoles", async (req, res) => {
  const result = await generalCase.find(req, res, "Roles");
  return result;
});
*/
module.exports = router;
