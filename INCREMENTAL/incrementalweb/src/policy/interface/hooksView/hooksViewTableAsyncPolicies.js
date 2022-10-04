import createResource from "../../../utilities/allLayers/createResource";
import HookViewTablePolicies from "./hooksViewTablePolicy";
import crudApTablePolicy, {crudApTablePoliciesSave} from "../../application/crud/crudApTablePolicy";
const onGetHookViewTablePolicies = async (props) => {
  const dataAndDesing = await crudApTablePolicy(props);
  //devuelvo la tabla con el modal
  return <HookViewTablePolicies id={"tblPolicies"} title={"policies"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTablePoliciesSave} />;
};
const routerResource = createResource(onGetHookViewTablePolicies);
export const HookViewTableAsyncPolicies = (props) => {
  return routerResource.read(props);
};
