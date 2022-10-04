import {attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
import {findAllUsers, createUser, updateUser, deleteUser} from "../../infrastructure/services/bdsUser";
import {adapTranslation, adapValueRelation, getValuesAllSelectOne, adapWhiteItemInArrays} from "../../../utilities/allLayers/adaptersAllLayers";
import {getStatus, getValuesSelectOneStatus} from "../../../utilities/application/utilsApplication";
import {errorMessage} from "../../../transversal/error/errorController";
import { USER_OBJECT_TYPE } from "../../../utilities/allLayers/utilsAllLayers";
import { deleteGeneralObject, findGeneralEdge } from "../../../utilities/infrastructure/services/bsdAll";
import { cleanValuesAndRelations, createRelations, updateRelations } from "../../../utilities/application/crud/crudApUtils";
export default async function crudApTableUser(props) {
  //Obtener los datos de usuario logueado
 let sCurrentUserId  = props.context?.cache?.user;
 let sCurrentGroupId = props.context?.cache?.groupLast; // si tiene más de un grupo, ¿cúal usamos?
 let sCurrRoleId     = props.context?.cache?.roleLast; // ¿cuál es el rol activo?
 let bUserIsAdmin    = props.context?.user?.isAdmin;    

 if( !sCurrentUserId || !sCurrentGroupId || !sCurrRoleId ) {
   errorMessage("crudApTableProjectSave", "Wrong User data (UserId, GroupId and RoleId are required)");
   return false;
 }
 //let tableValues = await findAllUsersForUser(sCurrentUserId, sCurrentGroupId, sCurrRoleId, bUserIsAdmin);
 //obtengo los valores de la tabla Users en caso de tener que editar datos, en caso contrario values={undefined}
  let tableValues = await findAllUsers();
  //obtengo los atributos de la tabla y el modal
  let dialogContent = await attributelistObjectTypes(USER_OBJECT_TYPE);
  //traduzco las labels
  dialogContent = adapTranslation(dialogContent);
  //obtengo los datos relacionados a otras tablas o edges
  tableValues = await adapValueRelation(dialogContent, tableValues);
  //adaptamos añadiendo los valores de los select-on a cada campo
  //dialogContent = await adapValuesAllSelectOne(dialogContent);
  //obtengo los datos de los combos en caso de tener combos el formulario
  const valuesAllSelectOne = await getValuesAllSelectOne(dialogContent);
  //GUARDAR EN CONTEXT para el modal de busqueda avanzada dialogContent y valuesAllSelectOne¡
  const dialogContentAdvancedSearch = JSON.parse(JSON.stringify(dialogContent).replaceAll('"required":true', '"required":false').replaceAll('"readOnly":true', '"readOnly":false'));
  //obtenemos la coleccion para cargar el select-one de status
  const valuesSelectOneStatus = await getValuesSelectOneStatus();
  valuesAllSelectOne.status = valuesSelectOneStatus;
  //añado un item en blanco en todos los arrays
  const arraysWithWhite = adapWhiteItemInArrays(valuesAllSelectOne);
  if (props?.isSearcher !== true) {
    props.context.tableDispatch.handlTableCreateInArr({table: "users", dialogContent: dialogContentAdvancedSearch, valuesAllSelectOne: arraysWithWhite});
  }
  tableValues = await getStatus(tableValues, USER_OBJECT_TYPE);
  //adapto los datos eliminando columnas que no se mostraran el la tabla. Nota, si el valor es modificable sera un combo.
  //tableValues = adapRemoveItemsDatabase(tableValues);
  if (props?.isSearcher === true) {
    return {dialogContent: dialogContentAdvancedSearch, tableValues: tableValues, valuesAllSelectOne: arraysWithWhite};
  }
  return {dialogContent: dialogContent, tableValues: tableValues, valuesAllSelectOne: valuesAllSelectOne};
}
export async function crudApTableUsersSave(context, action, dbId, values, attributes) {
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
      resData = await createUser(savedValues);
      if (resData !== undefined) {
        resStatus = await createRelations(resData._id, relationKeys, documentGroupRelations, USER_OBJECT_TYPE);
        //Update at least _id
        values['_id'] = resData._id;
      }
    }
    if (action === "update" && dbId !== undefined) {
      resData = await updateUser(dbId, savedValues);
      if (resData !== undefined) {
        resStatus = await updateRelations(dbId, relationKeys, documentGroupRelations, USER_OBJECT_TYPE);
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
        resData = await deleteUser(id);
      }
    }
    if (resData === 0 && resStatus !== 0) {
      errorMessage("crudApTableUsersSave", "Error data");
      return false;
    } else {
      return values;
    }
  } catch (e) {
    errorMessage("crudApTableUsersSave", e);
  }
}
