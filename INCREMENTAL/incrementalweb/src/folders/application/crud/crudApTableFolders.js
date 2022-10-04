import {attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
import {findAllFolders, findAllFoldersForUser, createFolder, updateFolder, deleteFolder} from "../../infrastructure/services/bdsFolders";
import {adapTranslation, adapValueRelation,  getValuesAllSelectOne, adapWhiteItemInArrays} from "../../../utilities/allLayers/adaptersAllLayers";
import {getStatus,  getValuesSelectOneStatus}  from "../../../utilities/application/utilsApplication";
import {errorMessage} from "../../../transversal/error/errorController";
import { FOLDER_OBJECT_TYPE } from "../../../utilities/allLayers/utilsAllLayers";
import { deleteGeneralObject, findGeneralEdge } from "../../../utilities/infrastructure/services/bsdAll";
import { cleanValuesAndRelations, createRelations, updateRelations } from "../../../utilities/application/crud/crudApUtils";

export default async function crudApTableFolders(props) {
  //Obtener los datos de usuario logueado
  let sCurrentUserId  = props.context?.cache?.user;
  let sCurrentGroupId = props.context?.cache?.groupLast; // si tiene más de un grupo, ¿cúal usamos?
  let sCurrRoleId     = props.context?.cache?.roleLast; // ¿cuál es el rol activo?
  let bUserIsAdmin    = props.context?.user?.isAdmin;    

  if( !sCurrentUserId || !sCurrentGroupId || !sCurrRoleId ) {
    errorMessage("crudApTableProjectSave", "Wrong User data (UserId, GroupId and RoleId are required)");
    return false;
  }
  //let tableValues = await findAllFoldersForUser(sCurrentUserId, sCurrentGroupId, sCurrRoleId, bUserIsAdmin);

  //obtengo los valores de la tabla Documents en caso de tener que editar datos, en caso contrario values={undefined}
  let tableValues = await findAllFolders();
  //obtengo los atributos de la tabla y el modal
  let dialogContent = await attributelistObjectTypes(FOLDER_OBJECT_TYPE);
  //traduzco las labels
  dialogContent = adapTranslation(dialogContent);
  //obtengo los datos relacionados a otras tablas o edges
  tableValues = await adapValueRelation(dialogContent, tableValues);
  //adaptamos añadiendo los valores de los select-on a cada campo
  //dialogContent = await adapValuesAllSelectOne(dialogContent);
  //obtengo los datos de los combos en caso de tener combos el formulario
  const valuesAllSelectOne = await getValuesAllSelectOne(dialogContent);
  //GUARDAR EN CONTEXT para el modal de busqueda avanzada dialogContent y valuesAllSelectOne
  const dialogContentAdvancedSearch = JSON.parse(JSON.stringify(dialogContent).replaceAll('"required":true', '"required":false').replaceAll('"readOnly":true', '"readOnly":false'));
  //obtenemos la coleccion para cargar el select-one de status
  const valuesSelectOneStatus = await getValuesSelectOneStatus();
  valuesAllSelectOne.status = valuesSelectOneStatus;
  //añado un item en blanco en todos los arrays
  const arraysWithWhite = adapWhiteItemInArrays(valuesAllSelectOne);
  if (props?.isSearcher !== true) {
    props.context.tableDispatch.handlTableCreateInArr({table: "folders", dialogContent: dialogContentAdvancedSearch, valuesAllSelectOne: arraysWithWhite});
  }
  //obtenemos el status (objectType Base)
  tableValues = await getStatus(tableValues, FOLDER_OBJECT_TYPE);
  //adapto los datos eliminando columnas que no se mostraran el la tabla. Nota, si el valor es modificable sera un combo.
  //tableValues = adapRemoveItemsDatabase(tableValues);
  if (props?.isSearcher === true) {
    return {dialogContent: dialogContentAdvancedSearch, tableValues: tableValues, valuesAllSelectOne: arraysWithWhite};
  }
  return {dialogContent: dialogContent, tableValues: tableValues, valuesAllSelectOne: valuesAllSelectOne};
}
export async function crudApTableFoldersSave(context, action, dbId, values, attributes) {
  try {
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
      resData = await createFolder(savedValues);
      resStatus = await createRelations(resData._id, relationKeys, documentGroupRelations, FOLDER_OBJECT_TYPE);
      //Update at least _id
      values['_id'] = resData._id;
    }
    if (action === "update" && dbId !== undefined) {
      resData = await updateFolder( dbId, savedValues);
      if (resData !== undefined) {

        resStatus = await updateRelations(dbId, relationKeys, documentGroupRelations, FOLDER_OBJECT_TYPE);
        //Update at least _id
        values['_id'] = dbId;
      }
    }
    if (action === "delete") {
      for await (const id of values[values.length - 1]) {
        Object.keys(relationKeys).forEach( async (key ) => {
          let resEdge = await findGeneralEdge(relationKeys[key].att.relationName, id);
          if (resEdge !== undefined) {
              await deleteGeneralObject( relationKeys[key].att.relationName, resEdge._id);
          }
        });
        resData = await deleteFolder(id);
      }
    }
    if (resData === 0 && resStatus !== 0) {
      errorMessage("crudApTableFoldersSave", "Error data");
      return false;
    } else {
      return values;
    }
  } catch (e) {
    errorMessage("crudApTableFoldersSave", e);
  }
}
