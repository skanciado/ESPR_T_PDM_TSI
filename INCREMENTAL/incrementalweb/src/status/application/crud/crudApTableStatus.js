import {attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
import {findAllStatus, createStatus, updateStatus, deleteStatus} from "../../infrastructure/services/bdsStatus";
import {adapTranslation, adapValueRelation, adapRemoveItemsDatabase, getValuesAllSelectOne} from "../../../utilities/allLayers/adaptersAllLayers";
import {errorMessage} from "../../../transversal/error/errorController";
import { STATUS_OBJECT_TYPE } from "../../../utilities/allLayers/utilsAllLayers";
import { deleteGeneralObject, findGeneralEdge } from "../../../utilities/infrastructure/services/bsdAll";
import { cleanValuesAndRelations, createRelations, updateRelations } from "../../../utilities/application/crud/crudApUtils";
export default async function crudApTableStatus() {
  //obtengo los valores de la tabla Users en caso de tener que editar datos, en caso contrario values={undefined}
  let tableValues = await findAllStatus();
  //obtengo los atributos de la tabla y el modal
  let dialogContent = await attributelistObjectTypes(STATUS_OBJECT_TYPE);
  //traduzco las labels
  dialogContent = adapTranslation(dialogContent);
  //obtengo los datos relacionados a otras tablas o edges
  tableValues = await adapValueRelation(dialogContent, tableValues);
  //adaptamos añadiendo los valores de los select-on a cada campo
  //dialogContent = await adapValuesAllSelectOne(dialogContent);
  //obtengo los datos de los combos en caso de tener combos el formulario
  const valuesAllSelectOne = await getValuesAllSelectOne(dialogContent);
  //adapto los datos eliminando columnas que no se mostraran el la tabla. Nota, si el valor es modificable sera un combo.
  //tableValues = adapRemoveItemsDatabase(tableValues);
  return {dialogContent: dialogContent, tableValues: tableValues, valuesAllSelectOne: valuesAllSelectOne};
}
export async function crudApTableStatusSave(context, action, dbId, values, attributes) {
  try {
    //el valor status se guarda en otra tabla
    let resData = undefined;
    let resStatus = 0;
    let relationKeys = {};     
    let documentGroupRelations  = [];
    let savedValues = undefined;
    let retorno = await cleanValuesAndRelations(dbId,values,attributes);
    if (retorno !== undefined){
      savedValues = retorno.values;
      documentGroupRelations = retorno.documentGroupRelations
      relationKeys = retorno.relationKeys;
    }
    if (action === "create") {
      resData = await createStatus(savedValues);
      if (resData !== undefined) {
        resStatus = await createRelations(resData._id, relationKeys, documentGroupRelations, STATUS_OBJECT_TYPE);
        //Update at least _id
        values['_id'] = resData._id;
      }
    }
    if (action === "update" && dbId !== undefined) {
      resData = await updateStatus(dbId, savedValues);
      if (resData !== undefined) {
        resStatus = await updateRelations(dbId, relationKeys, documentGroupRelations, STATUS_OBJECT_TYPE);
      }
      //Update at least _id
      values['_id'] = dbId;
    }
    if (action === "delete") {
      for await (const id of values[values.length - 1]) {
        Object.keys(relationKeys).forEach( async (key ) => {
            let resEdge = await findGeneralEdge(relationKeys[key].att.relationName, id);
            if (resEdge !== undefined) {
                await deleteGeneralObject( relationKeys[key].att.relationName, resEdge._id);
            }
        });
        resData = await deleteStatus(id);
      }
    }
    if (resData === 0) {
      errorMessage("crudApTableStatusSave", "Error data");
      return false;
    } else {
      return values;
    }
  } catch (e) {
    errorMessage("crudApTableStatusSave", e);
  }
}
