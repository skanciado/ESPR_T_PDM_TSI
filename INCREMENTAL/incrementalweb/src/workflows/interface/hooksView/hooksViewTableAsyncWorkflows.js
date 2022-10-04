import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableWorkflows from "./hooksViewTableWorkflows";
import crudApTableWorkflows, {crudApTableWorkFlowsSave} from "../../application/crud/crudApTableWorkflows";
const onGetHookViewTableWorkflows = async (props) => {
  const dataAndDesing = await crudApTableWorkflows(props);
  //devuelvo la tabla con el modal
  return <HookViewTableWorkflows tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableWorkFlowsSave} />;
};
const routerResource = createResource(onGetHookViewTableWorkflows);
export const HookViewTableAsyncWorkflows = (props) => {
  return routerResource.read(props);
};
