const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findUser", async (req, res) => {
  const result = await generalCase.find(req, res, "Users");
  return result;
});
router.get("/findAllUsers", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Users");
  return result;
});
router.post("/deleteUsers", async (req, res) => {
  const result = await generalCase.remove(req, res, "Users");
  return result;
});
router.post("/updateUsers", async (req, res) => {
  const result = await generalCase.update(req, res, "Users");
  return result;
});
router.post("/createUsers", async (req, res) => {
  const result = await generalCase.create(req, res, "Users");
  return result;
});
module.exports = router;
