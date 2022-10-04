import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableObjectTypes from "./hooksViewTableObjectType";
import crudApTableObjectType from "../../application/crud/crudApTableObjectType";
import crudApTableObjectTypesSave from "../../application/crud/crudApTableObjectType";
const onGetHookViewTableObjectTypes = async (props) => {
  const dataAndDesing = await crudApTableObjectType(props);
  //devuelvo la tabla con el modal
  return <HookViewTableObjectTypes id={"tblObjectTypes"} title={"objecTypes"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableObjectTypesSave} />;
};
const routerResource = createResource(onGetHookViewTableObjectTypes);
export const HookViewTableAsyncObjectTypes = (props) => {
  return routerResource.read(props);
};
