const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findTask", async (req, res) => {
  const result = await generalCase.find(req, res, "Task");
  return result;
});
router.get("/findAllTasks", async (req, res) => {
  const result = await generalCase.findAll(req, res, "Task");
  return result;
});
router.post("/deleteTask", async (req, res) => {
  const result = await generalCase.remove(req, res, "Task");
  return result;
});
router.post("/updateTask", async (req, res) => {
  const result = await generalCase.update(req, res, "Task");
  return result;
});
router.post("/createTask", async (req, res) => {
  const result = await generalCase.create(req, res, "Task");
  return result;
});
module.exports = router;
