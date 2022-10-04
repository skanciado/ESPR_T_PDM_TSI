const router = require("express").Router();
const generalCase = require("./generalCase");
router.post("/aqlQuery", async (req, res) => {
  const result = await generalCase.query(req, res);
  return result;
});

router.post("/createGeneralEdge", async (req, res) => {
  const result = await generalCase.create(req, res, req.body.where);
  return result;
});

router.post("/findGeneralEdge", async (req, res) => {
  const result = await generalCase.find(req, res, req.body.where);
  return result;
});

router.post("/updateGeneralEdge", async (req, res) => {
    const result = await generalCase.update(req, res, req.body.where);
    return result;
  });

router.post("/deleteGeneralEdge", async (req, res) => {
    const result = await generalCase.remove(req, res, req.body.where);
    return result;
});


router.post("/findGeneralObject", async (req, res) => {
    const result = await generalCase.find(req, res, req.body.where);
    return result;
  });

router.post("/deleteGeneralObject", async (req, res) => {
    const result = await generalCase.remove(req, res, req.body.where);
    return result;
});


module.exports = router;
