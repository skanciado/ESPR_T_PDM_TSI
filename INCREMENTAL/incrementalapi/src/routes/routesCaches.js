const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/findCache", async (req, res) => {
  const result = await generalCase.find(req, res, "Caches");
  return result;
});
router.post("/updateCache", async (req, res) => {
  const result = await generalCase.update(req, res, "Caches");
  return result;
});
router.post("/createCache", async (req, res) => {
    const result = await generalCase.create(req, res, "Caches");
    return result;
  });
module.exports = router;
