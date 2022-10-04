import {attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
import {getLifecycleStatusList} from "../../infrastructure/services/bdsLifeCycle";
import {findEdgeCurrentLifecycles} from "../../../currentLifecycles/infrastructure/services/bdsCurrentLifeCycles";
import {adapTranslation, adapValueRelation, adapRemoveItemsDatabase, getValuesAllSelectOne} from "../../../utilities/allLayers/adaptersAllLayers";
import {errorMessage} from "../../../transversal/error/errorController";

export default async function crudApLifeCycleGraph( iObjTypeId, context ) {
//   //obtengo los valores de la tabla Users en caso de tener que editar datos, en caso contrario values={undefined}
//   let tableValues = await findAllLifeCycles();
//   //obtengo los atributos de la tabla y el modal
//   let dialogContent = await attributelistObjectTypes("ObjectTypes/10392510");
//   //traduzco las labels
//   dialogContent = adapTranslation(dialogContent);
//   //obtengo los datos relacionados a otras tablas o edges
//   tableValues = await adapValueRelation(dialogContent, tableValues);
//   //adaptamos añadiendo los valores de los select-on a cada campo
//   //dialogContent = await adapValuesAllSelectOne(dialogContent);
//   //obtengo los datos de los combos en caso de tener combos el formulario
//   const valuesAllSelectOne = await getValuesAllSelectOne(dialogContent);
//   //adapto los datos eliminando columnas que no se mostraran el la tabla. Nota, si el valor es modificable sera un combo.
//   tableValues = adapRemoveItemsDatabase(tableValues);
//   return {dialogContent: dialogContent, tableValues: tableValues, valuesAllSelectOne: valuesAllSelectOne};

    //const initialStatus = undefined;
    const oCurrentLifecycle = await findEdgeCurrentLifecycles(iObjTypeId, context);
    if( !oCurrentLifecycle ) {
        errorMessage("crudApLifeCycleGraph", "Cannot read CurrentLicecycle");
    }

    //Guardar el estado actual
    //const sCurrentStatusId = oCurrentLifecycle.currentStatus;

    // Obtener _to (para saber qué Licecycle hemos de usar para recuperar los estados.)
    const oRelatedLifecycle = oCurrentLifecycle._to;
    const sListOfStatus = await getLifecycleStatusList(oRelatedLifecycle, context);
    if( !sListOfStatus ) {
        errorMessage("crudApLifeCycleGraph", "Cannot read sListOfStatus");
    }
    //console.log( sListOfStatus );
    return {dialogContent: sListOfStatus };    
}

// export default async function crudApTableLifeCycle() {
//   //obtengo los valores de la tabla Users en caso de tener que editar datos, en caso contrario values={undefined}
//   let tableValues = await findAllLifeCycles();
//   //obtengo los atributos de la tabla y el modal
//   let dialogContent = await attributelistObjectTypes("ObjectTypes/10392510");
//   //traduzco las labels
//   dialogContent = adapTranslation(dialogContent);
//   //obtengo los datos relacionados a otras tablas o edges
//   tableValues = await adapValueRelation(dialogContent, tableValues);
//   //adaptamos añadiendo los valores de los select-on a cada campo
//   //dialogContent = await adapValuesAllSelectOne(dialogContent);
//   //obtengo los datos de los combos en caso de tener combos el formulario
//   const valuesAllSelectOne = await getValuesAllSelectOne(dialogContent);
//   //adapto los datos eliminando columnas que no se mostraran el la tabla. Nota, si el valor es modificable sera un combo.
//   tableValues = adapRemoveItemsDatabase(tableValues);
//   return {dialogContent: dialogContent, tableValues: tableValues, valuesAllSelectOne: valuesAllSelectOne};
// }
// export async function crudApTableLifeCyclesSave(context, action, values) {
//   try {
//     let resData = undefined;
//     if (action === "create") {
//       resData = await createLifeCycles(values.id, values.name, values.initialState);
//     }
//     if (action === "update") {
//       resData = await updateLifeCycles(undefined, values.id, values.id, values.name, values.initialState);
//     }
//     if (action === "delete") {
//       for await (const id of values[values.length - 1]) {
//         resData = await deleteLifeCycles(undefined, id);
//       }
//     }
//     if (resData === 0) {
//       errorMessage("crudApTableLifeCyclesSave", "Error data");
//       return false;
//     } else {
//       return true;
//     }
//   } catch (e) {
//     errorMessage("crudApTableLifeCyclesSave", e);
//   }
// }
