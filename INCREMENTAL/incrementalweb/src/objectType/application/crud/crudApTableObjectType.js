import {attributelistObjectTypes} from "../../infrastructure/services/bdsObjectType";
import {findAllObjectTypes} from "../../infrastructure/services/bdsObjectType";
import {adapTranslation, adapValueRelation, adapRemoveItemsDatabase, getValuesAllSelectOne} from "../../../utilities/allLayers/adaptersAllLayers";
export default async function crudApTableObjectTypes() {
  //obtengo los valores de la tabla Documents en caso de tener que editar datos, en caso contrario values={undefined}
  let tableValues = await findAllObjectTypes();
  //obtengo los atributos de la tabla y el modal
  //TODO: Cómo mostramos atributos de los object Types?
  let dialogContent = await attributelistObjectTypes("ObjectTypes/9580518"); //TODO
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
