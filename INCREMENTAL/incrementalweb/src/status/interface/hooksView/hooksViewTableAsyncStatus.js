import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableStatus from "./hooksViewTableStatus";
import crudApTableStatus, {crudApTableStatusSave} from "../../application/crud/crudApTableStatus";
const onGetHookViewTableStatus = async (props) => {
  const dataAndDesing = await crudApTableStatus(props);
  //devuelvo la tabla con el modal
  return <HookViewTableStatus id={"tblStatus"} title={"status"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableStatusSave} />;
};
const routerResource = createResource(onGetHookViewTableStatus);
export const HookViewTableAsyncStatus = (props) => {
  return routerResource.read(props);
};
