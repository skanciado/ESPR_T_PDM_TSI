import {getValueRelation} from "../../objectType/infrastructure/services/bdsObjectType";
import {findStatus, findAllStatus} from "../../status/infrastructure/services/bdsStatus";
import {findTask, findAllTasks} from "../../tasks/infrastructure/services/bdsTask";
import {findEdgeObjToLifecycle} from "../../objToLifecycle/infrastructure/services/bdsObjToLifeCycle";
import {findEdgeObjToWorkflow} from "../../objToWorkflow/infrastructure/services/bdsObjToWorkflow";
import {updateEdgeCurrentLifecycles, createEdgeCurrentLifecycles} from "../../currentLifecycles/infrastructure/services/bdsCurrentLifeCycles";
import {updateEdgeCurrentWorkflows, createEdgeCurrentWorkflows} from "../../currentWorkflows/infrastructure/services/bdsCurrentWorkflows";
//import {findLifecycle} from "../../lifeCycle/infrastructure/services/bdsLifeCycle";
import crudApTableDocument from "../../documents/application/crud/crudApTableDocument";
import crudApTableFolders from "../../folders/application/crud/crudApTableFolders";
import crudApTableProject from "../../projects/application/crud/crudApTableProject";
import crudApTableUser from "../../users/application/crud/crudApTableUser";
import crudApTableGroup from "../../groups/application/crud/crudApTableGroup";
import crudApTableWorkflows from "../../workflows/application/crud/crudApTableWorkflows";
import crudApLifeCycleGraph from "../../lifeCycle/application/crud/crudApLifeCycleGraph";
import crudApWorkflowGraph from "../../workflows/application/crud/crudApWorkflowGraph";
import { findLifecycle } from "../../lifeCycle/infrastructure/services/bdsLifeCycle";
import { findWorkflows } from "../../workflows/infrastructure/services/bdsWorkflows";
import { findGeneralEdge, createGeneralEdge, updateGeneralEdge, deleteGeneralObject } from "../infrastructure/services/bsdAll";

export async function getStatus(tableValues, idObjToLifecycle) {
  //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
  const objToLifecycle = await findEdgeObjToLifecycle(idObjToLifecycle);
  //const lifeCycle = await findLifecycle(objToLifecycle._to);
  if (objToLifecycle?.attributes[0].content[0].status.isRelation === true) {
    const relationCollectionType = objToLifecycle.attributes[0].content[0].status.relationKind;
    const relationCollectionName = objToLifecycle.attributes[0].content[0].status.relationName;
    const relationKeyResult = objToLifecycle.attributes[0].content[0].status.relationValue;
    let i = 0;
    for await (const row of tableValues) {
      const relationValueFilter = row._id;
      const currentStatus = await getValueRelation(relationCollectionType, relationCollectionName, relationKeyResult, relationValueFilter, "_from");
      const states = await findStatus(currentStatus);
      tableValues[i].status = states?._id;
      i++;
    }
  }
  return tableValues;
}
export async function setStatus(statusId, idTable, idObjToLifecycle) {
  //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
  const objToLifecycle = await findEdgeObjToLifecycle(idObjToLifecycle);
  if (objToLifecycle.attributes[0].content[0].status.isRelation === true) {
    const currentStatusUpdate = await updateEdgeCurrentLifecycles(undefined, idTable, undefined, statusId);
    return currentStatusUpdate;
  }
  return 0;
}

export async function getTask(tableValues, idObjToWorkflow) {
    //currentTask no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToWorkflow = await findEdgeObjToWorkflow(idObjToWorkflow);
    if (objToWorkflow?.attributes[0].content[0].currentTask.isRelation === true) {
      const relationCollectionType = objToWorkflow.attributes[0].content[0].currentTask.relationKind;
      const relationCollectionName = objToWorkflow.attributes[0].content[0].currentTask.relationName;
      const relationKeyResult = objToWorkflow.attributes[0].content[0].currentTask.relationValue;
      let i = 0;
      for await (const row of tableValues) {
        const relationValueFilter = row._id;
        const currentTask = await getValueRelation(relationCollectionType, relationCollectionName, relationKeyResult, relationValueFilter, "_from");
        const taskInfo = await findTask(currentTask);
        tableValues[i].currentTask = taskInfo?._id;
        i++;
      }
    }
    return tableValues;
  }

  export async function setTask(taskId, idTable, idObjToWorkflow) {
    //currentTask no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToWorkflow = await findEdgeObjToLifecycle(idObjToWorkflow);
    if (objToWorkflow.attributes[0].content[0].currentTask.isRelation === true) {
      const currentTaskUpdate = await updateEdgeCurrentWorkflows(undefined, idTable, undefined, taskId);
      return currentTaskUpdate;
    }
    return 0;
  }

export async function createEdgeRelation(relationName, relationAttributes, dbId, idObjFrom, relSearchTo){
    //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToLifecycle = await findGeneralEdge(relSearchTo, idObjFrom);
    if (objToLifecycle.attributes[0].content[0].status.isRelation === true) {
        const currentStatusCreated = await createGeneralEdge(relationName, dbId, objToLifecycle._to, relationAttributes);
        return currentStatusCreated;
    }
    return 0;
}

export async function updateEdgeRelation(relationName, relationAttributes,dbId){
    //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToLifecycle = await findGeneralEdge(relationName, dbId);
    if (objToLifecycle !== undefined) {
        const currentStatusCreated = await updateGeneralEdge(relationName, objToLifecycle._id, relationAttributes);
        return currentStatusCreated;
    }
    return 0;
}

export async function deleteEdgeRelation(relationName, dbId){
    //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToLifecycle = await findGeneralEdge(relationName, dbId);
    if (objToLifecycle !== undefined) {
        const currentStatusCreated = await deleteGeneralObject(relationName, objToLifecycle._id);
        return currentStatusCreated;
    }
    return 0;
}


export async function createStatus(statusId, idTable, idObjToLifecycle) {
  //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
  const objToLifecycle = await findEdgeObjToLifecycle(idObjToLifecycle);
  if (objToLifecycle.attributes[0].content[0].status.isRelation === true) {
    const currentStatusCreated = await createEdgeCurrentLifecycles(idTable, objToLifecycle._to, statusId);
    return currentStatusCreated;
  }
  return 0;
}

export async function createTask(taskId, idTable, idObjToWorkflow) {
    //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const objToWorkflow = await findEdgeObjToWorkflow(idObjToWorkflow);
    if (objToWorkflow.attributes[0].content[0].currentTask.isRelation === true) {
      const currentTaskCreated = await createEdgeCurrentWorkflows(idTable, objToWorkflow._to, taskId);
      return currentTaskCreated;
    }
    return 0;
  }

export async function getValuesSelectOneStatus() {
  //status no se obtiene por relacion directa a otra tabla (por eso esta funcion)
  const status = await findAllStatus();
  const valuesSelectOneStatus = status.map((status) => {
    return {key: status._id, value: status.name};
  });
  return valuesSelectOneStatus;
}
export async function getValuesSelectOneTask() {
    //currentTask no se obtiene por relacion directa a otra tabla (por eso esta funcion)
    const tasks = await findAllTasks();
    const valuesSelectOneTasks = tasks.map((task) => {
      return {key: task._id, value: task.name};
    });
    return valuesSelectOneTasks;
  }

export async function getValuesModalItem(tableName, context) {
  let dataAndDesing = undefined;
  context.isSearcher = true;
  if (tableName === "Documents") {
    dataAndDesing = await crudApTableDocument(context);
  } else if (tableName === "Folders") {
    dataAndDesing = await crudApTableFolders(context);
  } else if (tableName === "Groups") {
    dataAndDesing = await crudApTableGroup(context);
  } else if (tableName === "Projects") {
    dataAndDesing = await crudApTableProject(context);
  } else if (tableName === "Task") {
    dataAndDesing = undefined;
  } else if (tableName === "Users") {
    dataAndDesing = await crudApTableUser(context);
    //TODO: codigo temporal
    if (dataAndDesing !== undefined) {
      dataAndDesing.tableValues.forEach((item) => {
        if (item?.password !== undefined) {
          item.password = undefined;
        }
      });
    }
  } else if (tableName === "Workflows") {
    dataAndDesing = await crudApTableWorkflows(context);
  }
  context.isSearcher = false;
  return dataAndDesing;
}


export async function getInitialStatus(dbId) {
    const objToLifecycle = await findEdgeObjToLifecycle(dbId);
    if (objToLifecycle !== undefined ){
        const lifecycle = await findLifecycle(objToLifecycle._to);
        if( lifecycle !== undefined){
            return lifecycle.initialState;
        }
    }
    return undefined;
}

export async function getInitialTask(dbId) {
    const objToWorkflow = await findEdgeObjToWorkflow(dbId);
    if (objToWorkflow !== undefined ){
        const wf = await findWorkflows(objToWorkflow._to);
        if( wf !== undefined){
            return wf.initialTask;
        }
    }
    return undefined;
}

export async function getValuesModalItem2(tableName, sObjectDbId, sItemDbId, context) {
    let dataAndDesing = undefined;
    context.isSearcher = true;
    if (tableName === "CurrentLifecycle") {
      dataAndDesing = await crudApLifeCycleGraph( sObjectDbId, context );
      dataAndDesing["currentStatus"] = sItemDbId;
    } else if (tableName === "CurrentWorkflow") {
        dataAndDesing = await crudApWorkflowGraph( sObjectDbId, context );
        dataAndDesing["currentTask"] = sItemDbId;
      }
    context.isSearcher = false;
    return dataAndDesing;
  }
