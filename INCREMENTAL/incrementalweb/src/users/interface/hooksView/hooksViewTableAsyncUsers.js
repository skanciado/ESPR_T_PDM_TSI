import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableUsers from "./hooksViewTableUser";
import crudApTableUser, {crudApTableUsersSave} from "../../application/crud/crudApTableUser";
const onGetHookViewTableUsers = async (props) => {
  const dataAndDesing = await crudApTableUser(props);
  //devuelvo la tabla con el modal
  return <HookViewTableUsers id={"tblUsers"} title={"users"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableUsersSave} />;
};
const routerResource = createResource(onGetHookViewTableUsers);
export const HookViewTableAsyncUsers = (props) => {
  return routerResource.read(props);
};
