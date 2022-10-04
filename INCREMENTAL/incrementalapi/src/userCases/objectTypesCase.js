const router = require("express").Router();
const {createError, createErrorWithCode} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
const objTypeQueries = require("../services/objectTypesQueries");
const {saveLogMessage} = require("../services/log");
// Creates a new empty document collection,
// registers a new item in collection ObjectType,
// and creates a new Edge between the new ObjectType and its parent.
router.post("/createObjectTypes", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    const parent = req.body.parent;
    let data = req.body.data;
    const name = data.name;
    Object.keys(data).map((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });
    data = await objTypeQueries.newcollection(name, parent, data);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
// Returns the list of relative ObjectTypes to the given id (until reaching BaseObject)
router.post("/parentlistObjectTypes", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let data = req.body._id;
    data = await objTypeQueries.parentList(data);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
// Returns the resulting attribute structure of a ObjectType,
// after merging all attributes inside each found relative ObjectType
router.post("/attributelistObjectTypes", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let data = req.body._id;
    data = await objTypeQueries.attributeList(data);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
// Returns the resulting attribute structure of a ObjectType,
// after merging all attributes inside each found relative ObjectType
router.post("/effectiveperm", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let objId = req.body._id;
    let owner = req.body._id;
    let owningGroup = req.body._id;
    let userId = req.body.userId;
    let groupId = req.body.groupId;
    let roleId = req.body.roleId;
    let userInProject = req.body.userInProj;
    data = await objTypeQueries.effectivePermissions(objId, owner, owningGroup, userId, groupId, roleId, userInProject);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
// Creates a new empty document collection,
// registers a new item in collection ObjectType,
// and creates a new Edge between the new ObjectType and its parent.
router.post("/getObjectsForUser", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let objectTypeName = req.body.objectTypeName;
    let userId = req.body.userId;
    let groupId = req.body.groupId;
    let roleId = req.body.roleId;
    let data = await objTypeQueries.getObjectsForUser(objectTypeName, userId, groupId, roleId);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/getValueRelation", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let data = await objTypeQueries.getValueRelation(req.body.relationType, req.body.tableName, req.body.relationKey, req.body.filterKey, req.body.filterValue);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/getSelectOneRelation", async (req, res) => {
  try {
    const decrypt = await verifyToken(req, res);
    //if (decrypt.payload !== undefined) {
    let data = await objTypeQueries.getSelectOneRelation(req.body.relationType, req.body.relationName, req.body.relationKey);
    return res.send(data);
    //} else {
    //  return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    //}
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
});
module.exports = router;
