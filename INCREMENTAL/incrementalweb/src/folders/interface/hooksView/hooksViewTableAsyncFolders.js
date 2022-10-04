import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableFolders from "./hooksViewTableFolders";
import crudApTableFolders, {crudApTableFoldersSave} from "../../application/crud/crudApTableFolders";
const onGetHookViewTableFolders = async (props) => {
  const dataAndDesing = await crudApTableFolders(props);
  //devuelvo la tabla con el modal
  return <HookViewTableFolders id={"tblFolders"} title={"folders"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableFoldersSave} />;
};
const routerResource = createResource(onGetHookViewTableFolders);
export const HookViewTableAsyncFolders = (props) => {
  return routerResource.read(props);
};
