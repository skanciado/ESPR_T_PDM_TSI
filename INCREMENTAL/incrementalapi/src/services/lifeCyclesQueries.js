const DB = require("../config/db");
const generalQueries = require("./generalQueriesArangoDb");
//const userQueries = require("../services/usersQueries");
const {createErrorPromise, createErrorWithCode} = require("../utils/error");
const sQueryRange = "1..20";
exports.getStatusList = async (lifeCycleId) => {
  // Retrieve the Lifecycle Object
  const resultObj = await generalQueries.find("Lifecycles", {_id: lifeCycleId}).catch((e) => {
    return createErrorPromise(e);
  });

  let aResLC = await resultObj.all();
  let aStatusList = [];
  
  for (const currentLC of aResLC) {
    const currLCId = currentLC._id;
    const resultRelStatus = await generalQueries.findEdge("LifecycleStatus", {_from: currLCId}).catch((e) => {
        return createErrorPromise(e);
    });

    let aRelStatus = await resultRelStatus.all();    
    for (const currentLCRelStatus of aRelStatus) {
        // Retrieve Status related to Lifecycle
        let relStatusId = currentLCRelStatus._to;        

        const resultStatus = await generalQueries.find("Status", {_id: relStatusId}).catch((e) => {
            return createErrorPromise(e);
          });
        
        let aResStatus = await resultStatus.all();   
        
        

        for (const currentStatus of aResStatus) {
            let oCurrStatusObj = {
                _id: "",
                name: "",
                nextStatusList: [],
                previousStatusList: [],
            }

            oCurrStatusObj._id = currentStatus._id;
            oCurrStatusObj.name = currentStatus.name;
            aStatusList.push( oCurrStatusObj );
            
            //// Uncomment to test 1-Status LC
            //return aStatusList;

            //console.log("Added: " + currentStatus.name + " to aStatusList");
        }
    }

    
    


    // FIll next/previous arrays
    for (const currentStatus of aStatusList) {

        console.log("currentStatus: " + currentStatus._id + " (" + currentStatus.name + ")");
                    
        // Get relations where the current status is the Origin
        const resultPathFrom = await generalQueries.find("StatusPath", {_from: currentStatus._id}).catch((e) => {
            return createErrorPromise(e);
            });        
        let aResPathFrom = await resultPathFrom.all();

        for (const currentStatusPath of aResPathFrom) {
            const statusFromId = currentStatusPath._from;
            const statusToId = currentStatusPath._to;
            const bCanDemote = currentStatusPath.canDemote;

            // Save statusToId as NextStatus
            let oStatus1 = aStatusList.find( elem => elem._id === statusFromId );
            //console.log(oStatus1);
            oStatus1.nextStatusList.push(statusToId);

            if( bCanDemote ) {
                // Save statusFromId as PreviousStatus
                let oStatus2 = aStatusList.find( elem => elem._id == statusToId );
                oStatus2.previousStatusList.push(statusFromId);
            }
        }
    }   
    
    //console.log( aStatusList );
    

    
  }

  return aStatusList;

//   // Add a parentship relation in ParentObject collection
//   // If not value given, assuming BaseObject as default parent
//   if (!parent) {
//     parent = await this.getBaseObjectId();
//   }
//   // Create ParentObject edge between new ObjectType and its parent
//   const oEdgeAttributes = {};
//   const resultEdge = await generalQueries.createEdge("ParentObjects", oEdgeAttributes, resultObj._id, parent).catch((e) => {
//     return createErrorPromise(e);
//   });
//   //let resultObj = { "_id": "ObjectTypes/9561053" }
//   // Obtain list of Parent ObjectTypes
//   let aParents = await this.parentList(resultObj._id);
//   for (const parentObj of aParents) {
//     if (parentObj.relations) {
//       let parentId = parentObj._id;
//       for (const sRelation of parentObj.relations) {
//         let relatedResult = await generalQueries.find(sRelation, {_from: parentId});
//         aRelatedRes = await relatedResult.all();
//         for (const relObj of aRelatedRes) {
//           // Traverse each ObjectType attributes
//           let objAttributes = relObj.attributes;
//           for (const attrObj of objAttributes) {
//             const sTabName = attrObj.tabName;
//             const sTabContent = attrObj.content;
//             for (oTabInnerElem of sTabContent) {
//               const oAttribsPropObjs = Object.values(oTabInnerElem);
//               for (const oPropObj of oAttribsPropObjs) {
//                 // Obtaiun the name for the related EdgeCollection to be created
//                 let relCollectName = oPropObj["relationName"];
//                 if (relCollectName) {
//                   const relCollection = DB.edgeCollection(relCollectName);
//                   if (!(await relCollection.exists())) {
//                     return await relCollection.create().catch((e) => {
//                       return createErrorPromise(e);
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
};
