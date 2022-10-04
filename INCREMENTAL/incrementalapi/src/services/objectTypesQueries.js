const DB = require("../config/db");
const generalQueries = require("./generalQueriesArangoDb");
//const userQueries = require("../services/usersQueries");
const {createErrorPromise, createErrorWithCode} = require("../utils/error");
const sQueryRange = "1..20";
exports.newcollection = async (collectionName, parent, data) => {
  // Create the new Collection
  const collection = DB.collection(collectionName);
  await collection.create().catch((e) => {
    return createErrorPromise(e);
  });
  // Add a new entry in the ObjectType collection
  const resultObj = await generalQueries.create("ObjectTypes", data).catch((e) => {
    return createErrorPromise(e);
  });
  // Add a parentship relation in ParentObject collection
  // If not value given, assuming BaseObject as default parent
  if (!parent) {
    parent = await this.getBaseObjectId();
  }
  // Create ParentObject edge between new ObjectType and its parent
  const oEdgeAttributes = {};
  const resultEdge = await generalQueries.createEdge("ParentObjects", oEdgeAttributes, resultObj._id, parent).catch((e) => {
    return createErrorPromise(e);
  });
  //let resultObj = { "_id": "ObjectTypes/9561053" }
  // Obtain list of Parent ObjectTypes
  let aParents = await this.parentList(resultObj._id);
  for (const parentObj of aParents) {
    if (parentObj.relations) {
      let parentId = parentObj._id;
      for (const sRelation of parentObj.relations) {
        let relatedResult = await generalQueries.find(sRelation, {_from: parentId});
        aRelatedRes = await relatedResult.all();
        for (const relObj of aRelatedRes) {
          // Traverse each ObjectType attributes
          let objAttributes = relObj.attributes;
          for (const attrObj of objAttributes) {
            const sTabName = attrObj.tabName;
            const sTabContent = attrObj.content;
            for (oTabInnerElem of sTabContent) {
              const oAttribsPropObjs = Object.values(oTabInnerElem);
              for (const oPropObj of oAttribsPropObjs) {
                // Obtaiun the name for the related EdgeCollection to be created
                let relCollectName = oPropObj["relationName"];
                if (relCollectName) {
                  const relCollection = DB.edgeCollection(relCollectName);
                  if (!(await relCollection.exists())) {
                    return await relCollection.create().catch((e) => {
                      return createErrorPromise(e);
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
exports.getBaseObjectId = async () => {
  // Obtain the _id attribute for
  const sBaseObject = await generalQueries.find("ObjectTypes", {name: "BaseObject"}).catch((e) => {
    return createErrorPromise(e);
  });
  const sIdList = await sBaseObject.all();
  return sIdList[0]._id;
};
exports.getFullObjectType = async (_id) => {
  // Obtain the _id attribute for
  const sBaseObject = await generalQueries.find("ObjectTypes", {_id: _id}).catch((e) => {
    return createErrorPromise(e);
  });
  const sIdList = await sBaseObject.all();
  return sIdList[0];
};
exports.parentList = async (_id) => {
  // Obtain the ObjectType item for the given id
  const query = await generalQueries.find("ObjectTypes", {_id: _id});
  const resultObjType = await query.all();
  if (resultObjType.length < 1) {
    return createErrorWithCode(894, "Undefined ObjectType _id: " + _id);
  }
  let queryResult = await generalQueries.query(`              
            FOR node, edge, path IN ${sQueryRange} OUTBOUND "${_id}" ParentObjects
            FILTER node._id == "${process.env.OBJTYPE_BASEOBJECT_UID}"
            LIMIT 1
            RETURN path.vertices
            `);
  let aResult = [];
  if (queryResult._result.length > 0) {
    aResult = queryResult._result[0];
  }
  return aResult;
};
exports.attributeList = async (_id) => {
  // Obtain the list of whole ObjectType for all parent items (from bottom to BaseObject)
  const ObjResult = await this.getFullObjectType(_id);
  if (ObjResult.error) {
    return createErrorWithCode(ObjResult.code, ObjResult.message);
  }
  // Obtain the list of whole ObjectType for all parent items (from bottom to BaseObject)
  const ParentResult = await this.parentList(_id);
  if (ParentResult.error) {
    return createErrorWithCode(ParentResult.code, ParentResult.message);
  }
  // Build a resulting Object, which will merge all ObjectType properties
  let oAttrResult = {};
  let aAttrTabs = [];
  let aAttrList = [];
  // Include table components information (in order to render all table elements for that specific ObjectType)
  oAttrResult["tableButtons"] = ObjResult.tableButtons;
  for (const obj of ParentResult) {
    // Traverse each ObjectType attributes
    let objAttributes = obj.attributes;
    for (const attrObj of objAttributes) {
      const sTabName = attrObj.tabName;
      const sTabContent = attrObj.content;
      let oSelectedContent = {};
      // Check if TabName has already been created.
      //  Yes: Extend the list
      //  No:  Place current attribute list elements
      const indexTab = aAttrTabs.indexOf(sTabName);
      if (indexTab >= 0) {
        // Read the attributes currently stored in that Tab
        oSelectedContent = aAttrList[indexTab];
        let aListOfCurrentAttr = [];
        for (const currentAttr of oSelectedContent) {
          aListOfCurrentAttr.push(Object.keys(currentAttr));
        }
        // For each attribute in the new TabContent, check if the same attribute already exists in the list.
        // (low-ObjectType attributes have top-ObjectType ones, so if they already exist, we skip the top ones.)
        for (const newAttr of sTabContent) {
          const oAttrName = Object.keys(newAttr);
          const indexAttr = aListOfCurrentAttr.indexOf(oAttrName);
          // If the attribute does not exist, we add it.
          // Otherwise, we keep the existing one, and we skip the last one
          if (indexAttr === -1) {
            oSelectedContent.push(newAttr);
            aListOfCurrentAttr.push(oAttrName);
          }
        }
      } else {
        aAttrTabs.push(sTabName);
        aAttrList.push(sTabContent);
      }
    }
    // Traverse RelatedObjects
    let objRelations = obj.relations;
    let aRelatedRes = [];
    for (const relatedObj of objRelations) {
      let currObjId = obj._id;
      let relatedResult = await generalQueries.find(relatedObj, {_from: currObjId});
      aRelatedRes = await relatedResult.all();
      for (const relObj of aRelatedRes) {
        // Traverse each ObjectType attributes
        let objAttributes = relObj.attributes;
        for (const attrObj of objAttributes) {
          const sTabName = attrObj.tabName;
          const sTabContent = attrObj.content;
          let oSelectedContent = {};
          // Check if TabName has already been created.
          //  Yes: Extend the list
          //  No:  Place current attribute list elements
          const indexTab = aAttrTabs.indexOf(sTabName);
          if (indexTab >= 0) {
            // Read the attributes currently stored in that Tab
            oSelectedContent = aAttrList[indexTab];
            let aListOfCurrentAttr = [];
            for (const currentAttr of oSelectedContent) {
              aListOfCurrentAttr.push(Object.keys(currentAttr));
            }
            // For each attribute in the new TabContent, check if the same attribute already exists in the list.
            // (low-ObjectType attributes have top-ObjectType ones, so if they already exist, we skip the top ones.)
            for (const newAttr of sTabContent) {
              const oAttrName = Object.keys(newAttr);
              const indexAttr = aListOfCurrentAttr.indexOf(oAttrName);
              // If the attribute does not exist, we add it.
              // Otherwise, we keep the existing one, and we skip the last one
              if (indexAttr === -1) {
                oSelectedContent.push(newAttr);
                aListOfCurrentAttr.push(oAttrName);
              }
            }
          } else {
            aAttrTabs.push(sTabName);
            aAttrList.push(sTabContent);
          }
        }
      }
    }
  }
  //Re-build final Object, traversing each TabName, and mapping its computed content.
  const iNumOfTabs = aAttrTabs.length;
  let iTabCount = 0;
  oAttrResult["attributes"] = [];
  for (iTabCount = 0; iTabCount < iNumOfTabs; iTabCount++) {
    let oCurrTab = {};
    oCurrTab.tabName = aAttrTabs[iTabCount];
    // Sort Tab Content by each "position" value
    let aSortedAttrList = aAttrList[iTabCount].sort(this.sortAttributesByPosition);
    oCurrTab.content = aSortedAttrList;
    //oAttrResult.push(oCurrTab);
    oAttrResult["attributes"].push(oCurrTab);
  }
  return oAttrResult;
};
exports.sortAttributesByPosition = (a, b) => {
  let oKeyA = Object.keys(a);
  let oKeyB = Object.keys(b);
  let aVal = a[oKeyA]["position"];
  let bVal = b[oKeyB]["position"];
  if (aVal < bVal) {
    return -1;
  }
  if (aVal > bVal) {
    return 1;
  }
  return 0;
};
exports.effectivePermissions = async (_id, owner, owningGroup, currUserId, currGroupId, currRoleId, userInProject, userIsAdmin) => {
  // Permissions are defined in Policies, which are assigned to Lifecycle Statuses.
  //Depending on the current status, a different set of polices is applied.
  //The effective permissions is the result of merging all aplying Polices for a given input paremeters, such as:
  // - UserId
  // - GroupId
  // - RoleId
  // - Flag: User in project?
  //Retrieve information of the current LC assigned to the provided _id
  const query = await generalQueries.findEdge("CurrentLifecycle", {_from: _id}).catch((e) => {
    return createErrorPromise(e);
  });
  const resultLCEdges = await query.all();
  if (resultLCEdges.length == 0) {
    return createErrorWithCode(404, "No 'CurrentLifecycle' found for objectId: " + _id);
  }
  // Retrieve all Polices for the current status
  let currentStatusId = resultLCEdges[0].currentStatus;
  let resultAllPolices = await this.getAllPolicesForStatus(currentStatusId);
  if (resultAllPolices.length == 0) {
    return createErrorWithCode(404, "No polices found for statusId: " + currentStatusId);
  }
  // Return the effective permissions for the matching polices
  return await this.computeFinalEffectivePermissions(currUserId, currGroupId, currRoleId, userInProject, userIsAdmin, owner, owningGroup, resultAllPolices);
};
exports.getAllPolicesForStatus = async (_id) => {
  //Retrieve all Polices assigned to the given StatusId
  const query = await generalQueries.findEdge("StatusToPolicy", {_from: _id}).catch((e) => {
    return createErrorPromise(e);
  });
  const result = await query.all();
  let aResult = [];
  for (oPol of result) {
    let query = await generalQueries.findEdge("Policy", {_id: oPol._to}).catch((e) => {
      return createErrorPromise(e);
    });
    let aCurrPol = await query.all();
    if (aCurrPol.length > 0) {
      aResult.push(aCurrPol[0]);
    }
  }
  return aResult;
};
exports.computeFinalEffectivePermissions = async (currUserId, currGroupId, currRole, userInProject, userIsAdmin, owner, owningGroup, aPolices) => {
  let aForbiddenPerm = [];
  let oResults = {};
  oResults["read"] = false;
  oResults["modify"] = false;
  oResults["export"] = false;
  oResults["revise"] = false;
  oResults["linkObjects"] = false;
  oResults["promote"] = false;
  oResults["demote"] = false;
  if (!currUserId || !currGroupId || !currRole || !owner || !owningGroup) {
    console.log("Error: cannot compute effectivePermissions (undefined or null value provided)");
    return oResults;
  }
  // If the user is admin, allow full-control automatically
  if (userIsAdmin) {
    for (var key in oResults) {
      oResults[key] = true;
    }
    return oResults;
  }
  let sFilteredPolices = await aPolices.filter((oPolicy) => {
    let bCondUser = this.evaluatePolicyMatchValues(oPolicy, "user", "Owner", currUserId, owner);
    let bCondGroup = this.evaluatePolicyMatchValues(oPolicy, "group", "Owning Group", currGroupId, owningGroup);
    let bCondRole = this.evaluatePolicyMatchId(oPolicy, "role", currRole);
    let bCondInProj = this.evaluatePolicyMatchBool(oPolicy, "inProject", userInProject);
    return bCondUser && bCondGroup && bCondRole && bCondInProj;
  });
  for (oFilPol of sFilteredPolices) {
    oResults["read"] = this.obtainPolicyBoolValue("read", oResults["read"], oFilPol["read"], aForbiddenPerm);
    oResults["modify"] = this.obtainPolicyBoolValue("modify", oResults["modify"], oFilPol["modify"], aForbiddenPerm);
    oResults["export"] = this.obtainPolicyBoolValue("export", oResults["export"], oFilPol["export"], aForbiddenPerm);
    oResults["revise"] = this.obtainPolicyBoolValue("revise", oResults["revise"], oFilPol["revise"], aForbiddenPerm);
    oResults["linkObjects"] = this.obtainPolicyBoolValue("linkObjects", oResults["linkObjects"], oFilPol["linkObjects"], aForbiddenPerm);
    oResults["promote"] = this.obtainPolicyBoolValue("promote", oResults["promote"], oFilPol["promote"], aForbiddenPerm);
    oResults["demote"] = this.obtainPolicyBoolValue("demote", oResults["demote"], oFilPol["demote"], aForbiddenPerm);
  }
  return oResults;
};
exports.evaluatePolicyMatchValues = (oPolicy, attrKey, expectedAttrValue, givenValue, matchingValue) => {
  let bCond1 = oPolicy[attrKey] === "any";
  let bCond2 = oPolicy[attrKey] === expectedAttrValue && givenValue === matchingValue;
  return bCond1 || bCond2;
};
exports.evaluatePolicyMatchId = (oPolicy, attrKey, givenId) => {
  let bCond1 = oPolicy[attrKey] === "any";
  let bCond2 = oPolicy[attrKey] === givenId;
  return bCond1 || bCond2;
};
exports.evaluatePolicyMatchBool = (oPolicy, attrKey, givenBool) => {
  let bCond1 = oPolicy[attrKey] === "any";
  let bCond2 = false;
  if (!bCond1) {
    let bValue1 = Boolean(oPolicy[attrKey]);
    let bValue2 = Boolean(givenBool);
    bCond2 = bValue1 === bValue2;
  }
  return bCond1 || bCond2;
};
exports.obtainPolicyBoolValue = (attrKey, mergedValue, inputValue, aForbiddenAttr) => {
  if (aForbiddenAttr.includes(attrKey)) {
    return -1;
  }
  if (inputValue === -1) {
    aForbiddenAttr.push(attrKey);
    return -1;
  }
  return mergedValue || inputValue;
};
exports.getObjectsForUser = async (objectTypeName, userId, groupId, roleId, userIsAdmin) => {
  const allObjects = await generalQueries.find(objectTypeName, {}).catch((e) => {
    return createErrorPromise(e);
  });
  let aObjects = await allObjects.all();
  let aFilteredObjects = [];
  for (oCurrObj of aObjects) {
    // If the Object is not a project, determine to what Project is associated (can be null)
    let projectId = "";
    if (objectTypeName != "Projects") {
      let a = 0;
    } else {
      projectId = oCurrObj._id;
    }
    let objId = oCurrObj._id;
    let objOwner = oCurrObj.owner;
    let objOwningGroup = oCurrObj.owningGroup;
    const userInProject = await this.isUserProjectMember(userId, projectId);
    let oObjPerm = await this.effectivePermissions(objId, objOwner, objOwningGroup, userId, groupId, roleId, userInProject, userIsAdmin);
    if (oObjPerm["read"]) {
      aFilteredObjects.push(oCurrObj);
    }
  }
  return aFilteredObjects;
};
exports.isUserProjectMember = async (userId, projectId) => {
  const sMemberObj = await generalQueries.findEdge("ProjectMember", {_from: userId, _to: projectId}).catch((e) => {
    return createErrorPromise(e);
  });
  const sMemberList = await sMemberObj.all();
  return !!sMemberList[0];
};
