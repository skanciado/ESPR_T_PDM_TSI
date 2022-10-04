const DB = require("../config/db");
const generalQueries = require("./generalQueriesArangoDb");
//const userQueries = require("../services/usersQueries");
const {createErrorPromise, createErrorWithCode} = require("../utils/error");
const sQueryRange = "1..20";
exports.getTaskList = async (workflowId) => {
  //console.log("getTaskList!!!!");

  // Retrieve the Workflow Object
  const resultObj = await generalQueries.find("Workflows", {_id: workflowId}).catch((e) => {
    return createErrorPromise(e);
  });

  let aResWF = await resultObj.all();
  //console.log("aResWF contains " + aResWF.length + " elements");
  let aTaskList = [];
  
  for (const currentWF of aResWF) {
    //console.log("currentWF[1]");
    //console.log(currentWF);
    const currWFId = currentWF._id;
    const resultRelTask = await generalQueries.findEdge("WorkflowToTask", {_from: currWFId}).catch((e) => {
        return createErrorPromise(e);
    });

    let aRelTask = await resultRelTask.all();    

    //console.log("aRelTask contains " + aRelTask.length + " elements");
    for (const currentWFRelTask of aRelTask) {
        // Retrieve Status related to Lifecycle
        let relTaskId = currentWFRelTask._to;  
        //console.log("relTaskId: " + relTaskId);      
        const resultTask = await generalQueries.find("Task", {_id: relTaskId}).catch((e) => {
            return createErrorPromise(e);
          });
        
        let aResTask = await resultTask.all();         

        for (const currentTask of aResTask) {
            let oCurrTaskObj = {
                _id: "",
                name: "",
                type: "",
                description: "",
                nextTaskList: [],
                conditionTaskList: [],
                taskActionsList: [],
            }
            oCurrTaskObj._id = currentTask._id;
            oCurrTaskObj.name = currentTask.name;
            oCurrTaskObj.type = currentTask.type;
            oCurrTaskObj.description = currentTask.description;


            // // Obtain Actions for current Task
            // const resultRelActions = await generalQueries.findEdge("TaskToAction", {_from: currentTask._id}).catch((e) => {
            //   return createErrorPromise(e);
            // });
        
            // let aRelActions = await resultRelActions.all();  

            // //console.log("aRelActions contains " + aRelActions.length + " elements");
            // for (const currentTaskActon of aRelActions) {
            //   // Retrieve Action related to Task
            //   let relActionId = currentTaskActon._to;  
            //   //console.log("relActionId: " + relActionId);      
            //   const resultAction = await generalQueries.find("Actions", {_id: relActionId}).catch((e) => {
            //       return createErrorPromise(e);
            //     });
              
            //   let aResAction = await resultTask.all();         
            //   console.log("FOUnd " + aResAction.length + " actions for task " + relActionId)
            //   oCurrTaskObj.taskActionsList = aResAction;              
            // }


            aTaskList.push( oCurrTaskObj );
            console.log("Added: " + currentTask.name + " to aTaskList");
        }
    }

    

	//TODO: Completar listados de siguientes/anteriores tareas
    // Fill next/previous arrays
    for (const currentTask of aTaskList) {

        //console.log("currentTask: " + currentTask._id + " (" + currentTask.name + ")");
                    
        // Get relations where the current status is the Origin
        const resultPathFrom = await generalQueries.find("TaskPath", {_from: currentTask._id}).catch((e) => {
            return createErrorPromise(e);
            });        
        let aResPathFrom = await resultPathFrom.all();

        for (const currentTaskPath of aResPathFrom) {
          //console.log(currentTaskPath);

          const taskFromId = currentTaskPath._from;
          const taskToId = currentTaskPath._to;
          const sConditionResult = currentTaskPath.conditionResult;

          // Save statusToId as NextStatus
          let oTasks1 = aTaskList.find( elem => elem._id === taskFromId );
          //console.log(oTasks1);
          oTasks1.nextTaskList.push(taskToId);
          if( sConditionResult ) {
            oTasks1.conditionTaskList.push(sConditionResult);
          }    
                
        }

        console.log("Buscando ACTIONS!")
        // Obtain Actions for current Task
        const resultRelActions = await generalQueries.findEdge("TaskToAction", {_from: currentTask._id}).catch((e) => {
          return createErrorPromise(e);
        });
    
        let aRelActions = await resultRelActions.all();  

        //console.log("aRelActions tiene " + aRelActions.length + " elementos");
        //console.log(aRelActions);
        
        //console.log("aRelActions contains " + aRelActions.length + " elements");
        for (const currentTaskActon of aRelActions) {

          let oCurrActionObj = {
            template: undefined,
            name: "",
            description: "",
            status: "",
            params: []
          }

          oCurrActionObj.name = currentTaskActon.name;
          oCurrActionObj.description = currentTaskActon.description;
          oCurrActionObj.params = currentTaskActon.params;

          // Retrieve Action related to Task
          let taskToActionId = currentTaskActon._id; 
          let taskId = currentTaskActon._from;  
          let relActionId = currentTaskActon._to;  

          //console.log("relActionId: " + relActionId);      
          const resultAction = await generalQueries.find("Actions", {_id: relActionId}).catch((e) => {
              return createErrorPromise(e);
            });

          let aResAction = await resultAction.all();  

          if(aResAction.length > 0) {

            // Obtener estado actual de esa tarea para el workflow actual 
            const resultRelWfToT2A = await generalQueries.findEdge("CurrentWorkflowToTask2Action", { _from: currWFId._id, _to: taskToActionId}).catch((e) => {
              return createErrorPromise(e);
            });

            let aResWfToT2A = await resultRelWfToT2A.all();  

            if(aResWfToT2A.length > 0) {
              //console.log("1")

              oCurrActionObj.status = aResWfToT2A[0].status;

              let oTasks1 = aTaskList.find( elem => elem._id === taskId );
              //console.log(oTasks1)
              //console.log(oTasks1.taskActionsList)

              oCurrActionObj.template = aResAction[0];
              oTasks1.taskActionsList.push(oCurrActionObj); 
              console.log("Added Action to task " + taskId); 
            }
          }
                     
        }
    }   
    
    //console.log( aStatusList );
    

    
  }

  for( let oCurrTask of aTaskList ) {
    let aSortedActionsList = [];
    aSortedActionsList = oCurrTask.taskActionsList.sort( this.sortActionsByPrio);
    oCurrTask.taskActionsList = aSortedActionsList;
  }

  return aTaskList;
};

exports.sortActionsByPrio = (a, b) => {
  let oKeyA = Object.keys(a);
  let oKeyB = Object.keys(b);
  let aVal = a["prio"];
  let bVal = b["prio"];
  if (aVal < bVal) {
    return -1;
  }
  if (aVal > bVal) {
    return 1;
  }
  return 0;
};
