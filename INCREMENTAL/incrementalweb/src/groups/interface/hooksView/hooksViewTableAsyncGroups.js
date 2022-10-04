import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableGroups from "./hooksViewTableGroups";
import crudApTableGroup, {crudApTableGroupsSave} from "../../application/crud/crudApTableGroup";
const onGetHookViewTableGroups = async (x) => {
  const dataAndDesing = await crudApTableGroup();
  //devuelvo la tabla con el modal
  return <HookViewTableGroups id={"tblGroups"} title={"groups"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableGroupsSave} />;
};
const routerResource = createResource(onGetHookViewTableGroups);
export const HookViewTableAsyncGroups = (props) => {
  return routerResource.read(props);
};


