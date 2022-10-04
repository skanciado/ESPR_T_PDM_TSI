import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableRoles from "./hooksViewTableRoles";
import crudApTableRole, {crudApTableRolesSave} from "../../application/crud/crudApTableRole";
const onGetHookViewTableRoles = async (props) => {
  const dataAndDesing = await crudApTableRole(props);
  //devuelvo la tabla con el modal
  return <HookViewTableRoles id={"tblRoles"} title={"roles"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableRolesSave} />;
};
const routerResource = createResource(onGetHookViewTableRoles);
export const HookViewTableAsyncRoles = (props) => {
  return routerResource.read(props);
};
