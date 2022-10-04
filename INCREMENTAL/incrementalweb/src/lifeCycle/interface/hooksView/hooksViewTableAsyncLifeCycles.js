import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableLifeCycles from "./hooksViewTableLifeCycle";
import crudApTableLifeCycle, {crudApTableLifeCyclesSave} from "../../application/crud/crudApTableLifeCycle";
const onGetHookViewTableLifeCycles = async (props) => {
  const dataAndDesing = await crudApTableLifeCycle(props);
  //devuelvo la tabla con el modal
  return <HookViewTableLifeCycles id={"tblLifeCycles"} title={"lifecycles"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableLifeCyclesSave} />;
};
const routerResource = createResource(onGetHookViewTableLifeCycles);
export const HookViewTableAsyncLifeCycles = (props) => {
  return routerResource.read(props);
};
